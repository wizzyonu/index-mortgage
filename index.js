document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const resultsHeader = document.querySelector('.results-header');
    const calculatedHeader = document.querySelector('.calculated-header');
   
    
    
   

    document.querySelector('.form-header a').addEventListener('click', function(event) {
        event.preventDefault();
        form.reset();
        showInitialResults();
        
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value.replace(/[^0-9.]/g, ''));
        const mortgageTerm = parseFloat(document.getElementById('mortgage-term').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value);
        const mortgageType = document.querySelector('input[name="mortgage-type"]:checked').value;
        
        
        
        if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate)) {
            alert("Enter your values");
            return;
        }
    
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = mortgageTerm * 12;
        let monthlyPayment;

        if (mortgageType === 'peace') { 
            monthlyPayment = mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) 
                            / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        } else { 
            monthlyPayment = mortgageAmount * monthlyRate;
        }

        const totalPayment = monthlyPayment * numberOfPayments;

        
        document.querySelector('.payment').textContent = formatCurrency(monthlyPayment);
        document.querySelector('.repay').textContent = formatCurrency(totalPayment);

        // Show calculated results
        showCalculatedResults();
    });

    function showCalculatedResults() {
        resultsHeader.style.display = 'none';
        calculatedHeader.style.display = 'block';
    }

    function showInitialResults() {
        resultsHeader.style.display = 'block';
        calculatedHeader.style.display = 'none';
    }

    function formatCurrency(number) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(number);
    }
    
});
