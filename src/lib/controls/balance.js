export function calculateWaterBalance(ingress, egress, weightKg, adjustmentFactor = { perspiration: 12.5, endogenousWater: 5 }) {
    // Calculate perspiration and endogenous water based on weight
    const perspiration = adjustmentFactor.perspiration * weightKg;       // e.g., 12.5 ml/kg for insensible perspiration
    const endogenousWater = adjustmentFactor.endogenousWater * weightKg; // e.g., 5 ml/kg for metabolic water

    // Ensure ingress and egress are arrays
    if (!Array.isArray(ingress) || !Array.isArray(egress)) {
        throw new Error("Both ingress and egress should be arrays of numbers.");
    }
    if (typeof weightKg !== 'number' || weightKg <= 0) {
        throw new Error("Weight should be a positive number.");
    }

    // Calculate total ingress and egress
    const totalIngress = ingress.reduce((acc, amount) => acc + amount, 0) + endogenousWater;
    const totalEgress = egress.reduce((acc, amount) => acc + amount, 0) + perspiration;

    // Calculate net water balance
    const balance = totalIngress - totalEgress;

    return {
        ingress,
        egress,
        totalIngress,
        totalEgress,
        balance,  // positive balance indicates fluid retention, negative indicates loss
        details: {
            intake: totalIngress - endogenousWater,
            endogenousWater,
            output: totalEgress - perspiration,
            perspiration
        }
    };
}
