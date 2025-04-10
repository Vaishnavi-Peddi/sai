// Weather-based farming tips
const weatherTips = {
  Sunny: {
    tip: "Ensure proper irrigation as evaporation rates are high. Mulching can help retain soil moisture.",
    recommendations: [
      "Plant sun-loving crops such as tomatoes, corn, and sunflowers.",
      "Use drip irrigation to conserve water.",
      "Schedule watering in early mornings or late evenings to reduce evaporation.",
    ],
  },
  Rainy: {
    tip: "Focus on crops that thrive in wet conditions, such as rice. Avoid waterlogging by improving drainage.",
    recommendations: [
      "Grow water-tolerant crops like paddy and sugarcane.",
      "Build raised beds to prevent waterlogging.",
      "Inspect drainage channels regularly for blockages.",
    ],
  },
  Dry: {
    tip: "Use drought-resistant crop varieties. Implement water-saving techniques like drip irrigation.",
    recommendations: [
      "Choose drought-resistant crops like millet, sorghum, and chickpeas.",
      "Apply organic mulch to retain soil moisture.",
      "Harvest rainwater for irrigation during dry spells.",
    ],
  },
  Windy: {
    tip: "Consider windbreaks or shelterbelts to protect crops. Secure taller plants with stakes.",
    recommendations: [
      "Plant hardy crops like barley or oats.",
      "Establish tree lines or hedgerows as windbreaks.",
      "Use nets or row covers to shield sensitive plants.",
    ],
  },
  Humid: {
    tip: "Monitor for fungal diseases. Use disease-resistant crops and ensure proper airflow between plants.",
    recommendations: [
      "Select humidity-resistant crops like cucumbers and sweet potatoes.",
      "Space plants adequately to improve airflow.",
      "Apply natural fungicides to prevent mold and mildew.",
    ],
  },
};

// Crop-specific tips
const cropTips = {
  rice: "Ensure proper water management and avoid over-flooding. Opt for high-yield varieties.",
  wheat: "Use nitrogen-based fertilizers for healthy growth and ensure crop rotation to avoid pest buildup.",
  corn: "Plant corn in well-drained soil and fertilize with phosphorus-rich fertilizers.",
  millet: "Millets are drought-resistant; ensure minimum irrigation and organic fertilizers for better yields.",
  sugarcane: "Provide adequate irrigation and use organic compost for higher yields.",
};

// Handle "Let's Go" button click
document.getElementById("lets-go-btn").addEventListener("click", () => {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("main-container").classList.remove("hidden");
});

// Handle weather change and show tips
document.getElementById("weather").addEventListener("change", (e) => {
  const selectedWeather = e.target.value;
  const tipsBox = document.getElementById("weather-suggestions");
  const tipsText = document.getElementById("weather-tips");
  const recommendationsList = document.getElementById("recommendation-tips");

  if (selectedWeather && weatherTips[selectedWeather]) {
    const { tip, recommendations } = weatherTips[selectedWeather];
    tipsText.innerText = tip;
    recommendationsList.innerHTML = "";
    recommendations.forEach((rec) => {
      const li = document.createElement("li");
      li.textContent = rec;
      recommendationsList.appendChild(li);
    });
    tipsBox.classList.remove("hidden");
  } else {
    tipsBox.classList.add("hidden");
    tipsText.innerText = "Select a weather condition to get tips.";
    recommendationsList.innerHTML = "";
  }
});

// Handle form submission
document.getElementById("farming-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const weather = document.getElementById("weather").value;
  const soil = document.getElementById("soil").value;
  const crop = document.getElementById("crop").value.toLowerCase();
  const hectares = parseFloat(document.getElementById("hectares").value);

  if (!weather || !soil || !crop || !hectares) {
    alert("Please fill out all fields!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/farming/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weather, soil, crop, hectares }),
    });

    const data = await response.json();

    const cropTip = cropTips[crop] || "Ensure good soil management and proper care for healthy crops.";

    document.getElementById("results").classList.remove("hidden");
    document.getElementById("suggestion-text").innerText = cropTip;
    document.getElementById("investment-analysis").innerText = `Investment: ₹${data.investment} | Expected Profit: ₹${data.profit} | Estimated Loss: ₹${data.loss}`;
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to get suggestions. Make sure the backend is running.");
  }
});

// Simulate temperature field
function simulateTemperature() {
  const temperatureField = document.getElementById("temperature");

  if (!temperatureField) return;

  function generateRandomTemperature(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  function updateTemperatureTips(temp) {
    const tips = document.getElementById("weather-tips");
    temp = parseFloat(temp);

    if (temp < 0) {
      tips.innerText = "Temperature is freezing. Suitable for frost-resistant crops like barley and rye.";
    } else if (temp < 10) {
      tips.innerText = "Temperature is cold. Grow hardy crops like oats and spinach.";
    } else if (temp >= 10 && temp < 25) {
      tips.innerText = "Temperature is cool. Suitable for leafy vegetables like lettuce and broccoli.";
    } else if (temp >= 25 && temp <= 30) {
      tips.innerText = "Moderate temperature. Ideal for crops like maize, wheat, and tomatoes.";
    } else {
      tips.innerText = "High temperature. Ensure irrigation and consider heat-resistant crops like millet.";
    }
  }

  const initialTemp = generateRandomTemperature(-10, 40);
  temperatureField.value = initialTemp;
  updateTemperatureTips(initialTemp);

  setInterval(() => {
    const newTemp = generateRandomTemperature(-10, 40);
    temperatureField.value = newTemp;
    updateTemperatureTips(newTemp);
  }, 120000);
}

window.addEventListener("load", simulateTemperature);
