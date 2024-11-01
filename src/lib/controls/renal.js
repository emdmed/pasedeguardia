
export function calculateCreatinineClearance(age, weightKg, serumCreatinine, isFemale) {

    if(isFemale === "F"){
        isFemale = true
    } else {
        isFemale = false
    }
    // Validate inputs
    if (age <= 0 || weightKg <= 0 || serumCreatinine <= 0) {
        throw new Error("Age, weight, and serum creatinine must be positive numbers.");
    }

    // Cockcroft-Gault equation for males
    let crCl = ((140 - age) * weightKg) / (72 * serumCreatinine);

    // Adjust for females
    if (isFemale) {
        crCl *= 0.85;
    }

    return crCl;
}
