// script.js
document.getElementById("salaryCalculator").addEventListener("submit", function(event){
    event.preventDefault();

    const grossSalary = parseFloat(document.getElementById("grossSalary").value);
    const studentLoanPlan = document.getElementById("studentLoan").value;

    const newAnnualSalary = grossSalary * 1.065; // 6.5% rise
    const monthlySalary = grossSalary / 12;
    const newMonthlySalary = newAnnualSalary / 12;

    // Calculate the back-dated pay for 3 months
    const backDatedPayGross = (newMonthlySalary * 3) - (monthlySalary * 3);

    // Calculate taxes, student loan, pension, and NI for original and new salary
    const originalDeductions = calculateDeductions(grossSalary, studentLoanPlan, 3);
    const newDeductions = calculateDeductions(newAnnualSalary, studentLoanPlan, 3);
    const monthlyDeductions = calculateDeductions(newAnnualSalary, studentLoanPlan, 1);
    
    const netBackDatedPay = backDatedPayGross - (newDeductions - originalDeductions);

    const netMonthlySalary = newMonthlySalary - monthlyDeductions;


    document.getElementById("results").innerHTML = `
        <p>Your new annual gross salary as of December 2023 is: £${newAnnualSalary.toFixed(0)}</p>
        <p>Your new net monthly take-home pay is: £${netMonthlySalary.toFixed(0)}</p>
        <p>Your net back-dated pay for the 6.5% rise over 3 months is: £${netBackDatedPay.toFixed(0)}</p>
    `;
});

function calculateDeductions(annualSalary, studentLoanPlan, months) {
    const pensionContribution = calculatePensionContribution(annualSalary) / 12 * months;
    const tax = calculateTax(annualSalary, pensionContribution) / 12 * months;
    const studentLoanRepayment = calculateStudentLoanRepayment(annualSalary / 12, studentLoanPlan) * months;
    const nationalInsurance = calculateNationalInsurance(annualSalary) / 12 * months;

    return tax + studentLoanRepayment + pensionContribution + nationalInsurance;
}


function calculateTax(annualSalary, pensionContribution) {
    const personal_allowance = 12570;
    const basic_rate_upper_limit = 50270;
    const higher_rate_upper_limit = 150000;
    const basic_rate = 0.20;
    const higher_rate = 0.40;
    const additional_rate = 0.45;

    // Deduct pension contribution before calculating tax
    const taxableIncome = annualSalary - pensionContribution;

    let tax = 0;

    if (taxableIncome <= personal_allowance) {
        tax = 0;
    } else if (taxableIncome <= basic_rate_upper_limit) {
        tax = (taxableIncome - personal_allowance) * basic_rate;
    } else if (taxableIncome <= higher_rate_upper_limit) {
        tax = ((basic_rate_upper_limit - personal_allowance) * basic_rate) + ((taxableIncome - basic_rate_upper_limit) * higher_rate);
    } else {
        tax = ((basic_rate_upper_limit - personal_allowance) * basic_rate) + ((higher_rate_upper_limit - basic_rate_upper_limit) * higher_rate) + ((taxableIncome - higher_rate_upper_limit) * additional_rate);
    }

    return tax;
}

function calculateStudentLoanRepayment(monthlySalary, plan) {
    const plan1_threshold = 22015 / 12;
    const plan2_threshold = 27295 / 12;
    const student_loan_rate = 0.09;
    let repayment = 0;

    if (plan === "plan1" && monthlySalary > plan1_threshold) {
        repayment = (monthlySalary - plan1_threshold) * student_loan_rate;
    } else if (plan === "plan2" && monthlySalary > plan2_threshold) {
        repayment = (monthlySalary - plan2_threshold) * student_loan_rate;
    }

    return repayment;
}

function calculatePensionContribution(annualSalary) {
    let pension_rate;
    if (annualSalary <= 32135.99) {
        pension_rate = 0.074;
    } else if (annualSalary <= 43259.99) {
        pension_rate = 0.086;
    } else if (annualSalary <= 51292.99) {
        pension_rate = 0.096;
    } else if (annualSalary <= 67979.99) {
        pension_rate = 0.102;
    } else if (annualSalary <= 92697.99) {
        pension_rate = 0.113;
    } else {
        pension_rate = 0.117;
    }

    return annualSalary * pension_rate;
}

function calculateNationalInsurance(annualSalary) {
    const ni_lower_threshold = 12570;
    const ni_upper_threshold = 50270;
    const ni_lower_rate = 0.12;
    const ni_upper_rate = 0.02;

    let niContribution = 0;
    if (annualSalary > ni_lower_threshold) {
        if (annualSalary <= ni_upper_threshold) {
            niContribution = (annualSalary - ni_lower_threshold) * ni_lower_rate;
        } else {
            niContribution = ((ni_upper_threshold - ni_lower_threshold) * ni_lower_rate) + ((annualSalary - ni_upper_threshold) * ni_upper_rate);
        }
    }
    return niContribution;
}