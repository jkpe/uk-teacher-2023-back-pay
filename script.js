// script.js
document.getElementById("payCalculator").addEventListener("submit", function(event){
    event.preventDefault();

    // Get the current salary and student loan plan
    const currentSalary = parseFloat(document.getElementById("currentSalary").value);
    const studentLoanPlan = document.getElementById("studentLoan").value;
    const monthlySalary = currentSalary / 12;

    // Calculate the new monthly salary after the pay rise
    const newMonthlySalary = monthlySalary * 1.065;

    // Calculate back-dated pay (3 months)
    let backDatedPay = (newMonthlySalary * 3) - (monthlySalary * 3);

    // Calculate the tax for the back-dated pay
    let tax = calculateTax(backDatedPay);

    // Calculate student loan repayment
    let studentLoanRepayment = calculateStudentLoanRepayment(backDatedPay, studentLoanPlan);

    // Calculate pension contribution
    let pensionContribution = calculatePensionContribution(currentSalary);

    // Subtract tax, student loan, and pension from the back-dated pay to get the net total
    let netBackDatedPay = backDatedPay - tax - studentLoanRepayment - pensionContribution;

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

function calculateStudentLoanRepayment(income, plan) {
    const plan1Threshold = 22015 / 12; // Monthly threshold for Plan 1
    const plan2Threshold = 27295 / 12; // Monthly threshold for Plan 2
    let repayment = 0;

    if (plan === "plan1") {
        repayment = income > plan1Threshold ? (income - plan1Threshold) * 0.09 : 0;
    } else if (plan === "plan2") {
        repayment = income > plan2Threshold ? (income - plan2Threshold) * 0.09 : 0;
    }

    return repayment * 3; // Repayment for 3 months (back-dated pay)
}


function calculatePensionContribution(annualSalary) {
    let contributionRate;
    if (annualSalary <= 32135.99) {
        contributionRate = 0.074;
    } else if (annualSalary <= 43259.99) {
        contributionRate = 0.086;
    } else if (annualSalary <= 51292.99) {
        contributionRate = 0.096;
    } else if (annualSalary <= 67979.99) {
        contributionRate = 0.102;
    } else if (annualSalary <= 92697.99) {
        contributionRate = 0.113;
    } else {
        contributionRate = 0.117;
    }
    return annualSalary * contributionRate / 12; // Monthly pension contribution
}
