// script.js
document.getElementById("payCalculator").addEventListener("submit", function(event){
    event.preventDefault();

    // Get the current salary and student loan plan
    const currentSalary = parseFloat(document.getElementById("currentSalary").value);
    const studentLoanPlan = document.getElementById("studentLoan").value;
    const monthlySalary = currentSalary / 12;

    // Calculate the new monthly salary after the pay rise
    const newMonthlySalary = monthlySalary * 1.065;

    // Calculate back-dated pay (2 months)
    let backDatedPay = (newMonthlySalary * 2) - (monthlySalary * 2);

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
    // Tax calculation logic here (same as previous example)
}

function calculateStudentLoanRepayment(income, plan) {
    // Student loan repayment logic here (same as previous example)
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
