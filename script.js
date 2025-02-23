const inputs = {
    startMeter: document.getElementById('startMeter'),
    endMeter: document.getElementById('endMeter'),
    hourlyRate: document.getElementById('hourlyRate')
};

const results = {
    totalTime: document.getElementById('totalTime'),
    meterPoints: document.getElementById('meterPoints'),
    totalAmount: document.getElementById('totalAmount')
};

// Load saved data
let savedData = localStorage.getItem('jcbHourMeterData');
if (savedData) {
    savedData = JSON.parse(savedData);
    Object.keys(savedData).forEach(key => {
        if (inputs[key]) inputs[key].value = savedData[key];
    });
}

function calculateResults() {
    const start = parseFloat(inputs.startMeter.value) || 0;
    const end = parseFloat(inputs.endMeter.value) || 0;
    const rate = parseFloat(inputs.hourlyRate.value) || 0;

    const points = Math.max(end - start, 0);
    const hours = Math.floor(points);
    const minutes = Math.round((points - hours) * 60);

    // Update results
    results.totalTime.textContent = `${hours}h ${minutes}m`;
    results.meterPoints.textContent = points.toFixed(2);
    results.totalAmount.textContent = `₹${(points * rate).toFixed(2)}`;

    // Save to localStorage
    localStorage.setItem('jcbHourMeterData', JSON.stringify({
        startMeter: inputs.startMeter.value,
        endMeter: inputs.endMeter.value,
        hourlyRate: inputs.hourlyRate.value
    }));
}

// Event listeners
Object.values(inputs).forEach(input => {
    input.addEventListener('input', calculateResults);
});

document.getElementById('resetButton').addEventListener('click', () => {
    Object.values(inputs).forEach(input => input.value = '');
    localStorage.removeItem('jcbHourMeterData');
    calculateResults();
});

// Initial calculation
calculateResults();
