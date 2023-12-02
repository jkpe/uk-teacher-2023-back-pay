// script.js
document.getElementById("payCalculator").addEventListener("submit", function(event){
    event.preventDefault();

    // Get the current salary and student loan plan
    const currentSalary = document.getElementById("currentSalary").value;
    const studentLoanPlan = document.getElementById("studentLoan").value;

    // Calculate the new monthly salary
    const newMonthlySalary = (currentSalary * 1.065) / 12;
    const oldMonthlySalary = currentSalary / 12;
    const backDatedPay = (newMonthlySalary * 2) - (oldMonthlySalary * 2);

    // Display the result
    document.getElementById("result").innerHTML = `Your back-dated pay is: £${backDatedPay.toFixed(2)}`;
});
