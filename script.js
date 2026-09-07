const API_URL = "https://mindtrace-ml.onrender.com";

const form = document.getElementById("predictForm");
const resultCard = document.getElementById("result");
const scoreValue = document.getElementById("scoreValue");
const errorBox = document.getElementById("errorBox");
const submitBtn = form.querySelector(".submit-btn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    resultCard.classList.add("hidden");
    errorBox.classList.add("hidden");
    submitBtn.disabled = true;
    submitBtn.textContent = "Predicting...";

    const payload = {
        Age: Number(document.getElementById("age").value),
        Gender: document.getElementById("gender").value,
        Country: document.getElementById("country").value,
        Academic_Level: document.getElementById("academicLevel").value,
        Most_Used_Platform: document.getElementById("platform").value,
        Purpose_Of_Use: document.getElementById("purpose").value,
        Avg_Daily_Usage_Hours: Number(document.getElementById("avgUsage").value),
        Daily_Unlocks: Number(document.getElementById("dailyUnlocks").value),
        Study_Hours: Number(document.getElementById("studyHours").value),
        Physical_Activity_Hours: Number(document.getElementById("physicalActivity").value),
        Sleep_Hours_Per_Night: Number(document.getElementById("sleepHours").value),
        Stress_Level: document.getElementById("stressLevel").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail ? JSON.stringify(errData.detail) : "Prediction failed");
        }

        const data = await response.json();
        scoreValue.textContent = data.predicted_mental_health_score;
        resultCard.classList.remove("hidden");
    } catch (err) {
        errorBox.textContent = "Error: " + err.message;
        errorBox.classList.remove("hidden");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Predict Score";
    }
});
