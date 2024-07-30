function calculateProjectedIncome(resort, weekType, unit, weeks) {
    // Base rates for Offseason
    const baseRates = {
        'studio': 1400,
        '1br': 2200,
        '2br': 2800,
        '2br-lockout': 3000,  // Assumed rate for 2br-lockout
        '3br': 3400
    };

    // Calculate rates for each week type
    const rentalRates = {};
    const weekTypes = ['offseason', 'standard', 'peak', 'event'];

    // Validate inputs
    if (!weekTypes.includes(weekType)) {
        const errorMessage = `Invalid week type: ${weekType}. Valid options are: ${weekTypes.join(', ')}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (!baseRates.hasOwnProperty(unit)) {
        const errorMessage = `Invalid unit size: ${unit}. Valid options are: ${Object.keys(baseRates).join(', ')}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (typeof weeks !== 'number' || isNaN(weeks) || weeks < 1 || weeks > 52) {
        const errorMessage = `Invalid number of weeks: ${weeks}. Please enter a number between 1 and 52.`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    weekTypes.forEach((type, index) => {
        rentalRates[type] = {};
        for (const [unit, rate] of Object.entries(baseRates)) {
            rentalRates[type][unit] = rate + 200 * index;
        }
    });

    // Get the rental rate based on the selected week type and unit size
    const rate = rentalRates[weekType][unit];

    // Calculate the projected income
    return rate * weeks;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = calculateProjectedIncome;
}

// Real-time validation feedback
document.querySelectorAll('select, input').forEach((element) => {
    element.addEventListener('input', () => {
        if (element.checkValidity()) {
            element.classList.remove('invalid');
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
        }
    });
});

// Event listener for button click
document.getElementById('calculate').addEventListener('click', function() {
    const resort = document.getElementById('resort').value;
    const weekType = document.getElementById('weekType').value;
    const unit = document.getElementById('unit').value;
    const weeks = parseInt(document.getElementById('weeks').value);

    // Show loading spinner
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result').innerText = '';
    document.getElementById('error-message').innerText = '';

    setTimeout(() => {
        try {
            // Calculate the projected income
            const projectedIncome = calculateProjectedIncome(resort, weekType, unit, weeks);

            // Display the result
            document.getElementById('result').innerText = `Projected Income: $${projectedIncome.toLocaleString()}`;
        } catch (error) {
            // Display error message
            document.getElementById('error-message').innerText = `Error: ${error.message}`;
        } finally {
            // Hide loading spinner
            document.getElementById('loading').classList.add('hidden');
        }
    }, 500); // Simulate calculation delay
});
