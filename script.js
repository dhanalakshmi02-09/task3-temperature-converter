```javascript
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const message = document.getElementById("message");

const celsiusResult = document.getElementById("celsius");
const fahrenheitResult = document.getElementById("fahrenheit");
const kelvinResult = document.getElementById("kelvin");

const ABSOLUTE_ZERO_C = -273.15;
const ABSOLUTE_ZERO_F = -459.67;
const ABSOLUTE_ZERO_K = 0;

function clearResults() {
    celsiusResult.textContent = "-- °C";
    fahrenheitResult.textContent = "-- °F";
    kelvinResult.textContent = "-- K";
}

function showError(text) {
    message.textContent = text;
    clearResults();
}

function formatNumber(value) {
    if (Object.is(value, -0)) {
        value = 0;
    }

    return Number(value.toFixed(2)).toString();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    message.textContent = "";

    const rawValue = temperatureInput.value.trim();
    const value = Number(rawValue);
    const unit = unitSelect.value;

    if (rawValue === "" || !Number.isFinite(value)) {
        showError("Please enter a valid numeric temperature.");
        return;
    }

    let celsius;

    if (unit === "C") {
        celsius = value;

        if (value < ABSOLUTE_ZERO_C) {
            showError("Temperature cannot be below -273.15 °C.");
            return;
        }
    } else if (unit === "F") {
        if (value < ABSOLUTE_ZERO_F) {
            showError("Temperature cannot be below -459.67 °F.");
            return;
        }

        celsius = (value - 32) * 5 / 9;
    } else if (unit === "K") {
        if (value < ABSOLUTE_ZERO_K) {
            showError("Kelvin temperature cannot be below 0 K.");
            return;
        }

        celsius = value - 273.15;
    } else {
        showError("Please select a valid temperature unit.");
        return;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    celsiusResult.textContent = formatNumber(celsius) + " °C";
    fahrenheitResult.textContent = formatNumber(fahrenheit) + " °F";
    kelvinResult.textContent = formatNumber(kelvin) + " K";

    message.textContent = "Temperature converted successfully!";
    message.style.color = "#15803d";
});
```
