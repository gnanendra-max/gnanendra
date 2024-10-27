function calculateRisk() {
    // Get input values
    const pregnancies = parseInt(document.getElementById('pregnancies').value) || 0; // Default to 0 if NaN
    const glucose = parseInt(document.getElementById('glucose').value);
    const bloodPressure = parseInt(document.getElementById('bloodPressure').value);
    const skinThickness = parseInt(document.getElementById('skinThickness').value);
    const bmi = parseFloat(document.getElementById('bmi').value);
    const insulin = parseInt(document.getElementById('insulin').value);
    const diabetesPedigree = parseFloat(document.getElementById('diabetesPedigree').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    // Basic validation
    if (isNaN(glucose) || isNaN(bloodPressure) || isNaN(skinThickness) ||
        isNaN(bmi) || isNaN(insulin) || isNaN(diabetesPedigree) ||
        isNaN(age) || !gender) {
        alert("Please enter valid numbers for all fields and select your gender.");
        return;
    }

    // Additional validation for reasonable ranges
    if (glucose < 70 || glucose > 180) {
        alert("Glucose level should be between 70 and 180 mg/dL.");
        return;
    }
    if (bloodPressure < 60 || bloodPressure > 120) {
        alert("Blood Pressure should be between 60 and 120 mmHg.");
        return;
    }
    if (skinThickness < 5 || skinThickness > 50) {
        alert("Skin Thickness should be between 5 and 50 mm.");
        return;
    }
    if (bmi < 15 || bmi > 50) {
        alert("BMI should be between 15 and 50 kg/m².");
        return;
    }
    if (insulin < 0 || insulin > 500) {
        alert("Insulin level should be between 0 and 500 µU/mL.");
        return;
    }
    if (diabetesPedigree < 0 || diabetesPedigree > 2.5) {
        alert("Diabetes Pedigree Function should be between 0 and 2.5.");
        return;
    }
    if (age < 0 || age > 120) {
        alert("Age should be between 0 and 120 years.");
        return;
    }

    // Calculate risk based on the inputs
    let risk = "Low";
    let riskScore = 0;

    // Simple rule-based risk calculation
    riskScore += pregnancies * 0.1;
    riskScore += (glucose - 70) * 0.05;
    riskScore += (bloodPressure - 60) * 0.1;
    riskScore += (skinThickness - 5) * 0.05;
    riskScore += (bmi - 15) * 0.1;
    riskScore += insulin * 0.01;
    riskScore += diabetesPedigree * 0.2;
    riskScore += (age - 25) * 0.05;

    // Gender impact
    if (gender === "female") {
        riskScore += 1.0; // Assuming females have a different baseline risk
    }

    // Determine risk level based on score
    if (riskScore > 15) {
        risk = "Very High";
    } else if (riskScore > 10) {
        risk = "High";
    } else if (riskScore > 5) {
        risk = "Medium";
    } else if (riskScore > 2) {
        risk = "Low";
    } else {
        risk = "Very Low";
    }

    // Display result with color coding for better UX
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Your estimated diabetes risk is: <strong style="color: ${risk === 'Very High' ? 'darkred' : (risk === 'High' ? 'red' : (risk === 'Medium' ? 'orange' : (risk === 'Low' ? 'green' : 'lightgreen')))}">${risk}</strong></h2>`;
    
    // Suggest food based on risk level
    displayFoodSuggestions(risk);
}

function displayFoodSuggestions(risk) {
    const foodSuggestionsDiv = document.getElementById('foodSuggestions');
    let suggestions;

    switch (risk) {
        case "Very High":
            suggestions = [
                "Leafy greens (50 calories per serving)",
                "Avocado (160 calories per serving)",
                "Berries (70 calories per serving)",
                "Nuts (200 calories per serving)",
                "Salmon (200 calories per serving)"
            ];
            break;
        case "High":
            suggestions = [
                "Whole grains (150 calories per serving)",
                "Broccoli (55 calories per serving)",
                "Quinoa (220 calories per serving)",
                "Greek yogurt (100 calories per serving)",
                "Eggs (70 calories per serving)"
            ];
            break;
        case "Medium":
            suggestions = [
                "Fruits (100 calories per serving)",
                "Lean meat (150 calories per serving)",
                "Sweet potatoes (100 calories per serving)",
                "Oatmeal (150 calories per serving)",
                "Hummus (100 calories per serving)"
            ];
            break;
        case "Low":
            suggestions = [
                "Vegetables (50 calories per serving)",
                "Chicken breast (165 calories per serving)",
                "Tofu (70 calories per serving)",
                "Brown rice (215 calories per serving)",
                "Fish (200 calories per serving)"
            ];
            break;
        case "Very Low":
            suggestions = [
                "Apples (95 calories per serving)",
                "Carrots (50 calories per serving)",
                "Popcorn (30 calories per serving)",
                "Cottage cheese (80 calories per serving)",
                "Zucchini (20 calories per serving)"
            ];
            break;
        default:
            suggestions = [];
    }

    foodSuggestionsDiv.innerHTML = `<h3>Food Suggestions:</h3><ul>${suggestions.map(food => `<li>${food}</li>`).join('')}</ul>`;
}

// Event listener to manage the visibility of pregnancies input based on gender
document.getElementById('gender').addEventListener('change', function() {
    const pregnanciesRow = document.getElementById('pregnancyRow');
    if (this.value === 'male') {
        pregnanciesRow.style.display = 'none'; // Hide if male
        document.getElementById('pregnancies').value = ''; // Clear the input
    } else {
        pregnanciesRow.style.display = ''; // Show if female or other
    }
});
