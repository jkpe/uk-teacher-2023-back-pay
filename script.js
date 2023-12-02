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

    // Subtract tax and student loan from the back-dated pay to get the net total
    let netBackDatedPay = backDatedPay - tax - studentLoanRepayment;

    // Display the result
    document.getElementById("result").innerHTML = `Your net back-dated pay is: £${netBackDatedPay.toFixed(2)}`;
});

function calculateTax(income) {
    // Tax calculation logic here (same as previous example)
}

function calculateStudentLoanRepayment(income, plan) {
    let repayment = 0;
    const plan1Threshold = 20195 / 12; // Monthly threshold for Plan 1
    const plan2Threshold = 27295 / 12; // Monthly threshold for Plan 2

    if (plan === "plan1" && income > plan1Threshold) {
        repayment = (income - plan1Threshold) * 0.09;
    } else if (plan === "plan2" && income > plan2Threshold) {
        repayment = (income - plan2Threshold) * 0.09;
    }

    return repayment;
}
