// script.js
document.getElementById("payCalculator").addEventListener("submit", function(event){
    event.preventDefault();

    // Get the current salary
    const currentSalary = parseFloat(document.getElementById("currentSalary").value);
    const monthlySalary = currentSalary / 12;

    // Calculate the new monthly salary after the pay rise
    const newMonthlySalary = monthlySalary * 1.065;

    // Calculate back-dated pay (2 months)
    let backDatedPay = (newMonthlySalary * 2) - (monthlySalary * 2);

    // Calculate the tax for the back-dated pay
    let tax = calculateTax(backDatedPay);

    // Subtract tax from the back-dated pay to get the net total
    let netBackDatedPay = backDatedPay - tax;

    // Display the result
    document.getElementById("result").innerHTML = `Your net back-dated pay is: £${netBackDatedPay.toFixed(2)}`;
});

function calculateTax(income) {
    const personalAllowance = 12570;
    const basicRateUpperLimit = 50270;
    const higherRateUpperLimit = 150000;
    let tax = 0;

    if (income <= personalAllowance) {
        tax = 0;
    } else if (income <= basicRateUpperLimit) {
        tax = (income - personalAllowance) * 0.20;
    } else if (income <= higherRateUpperLimit) {
        tax = (basicRateUpperLimit - personalAllowance) * 0.20 + (income - basicRateUpperLimit) * 0.40;
    } else {
        tax = (basicRateUpperLimit - personalAllowance) * 0.20 + (higherRateUpperLimit - basicRateUpperLimit) * 0.40 + (income - higherRateUpperLimit) * 0.45;
    }

    return tax;
}
