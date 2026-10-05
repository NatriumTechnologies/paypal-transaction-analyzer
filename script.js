document.addEventListener('DOMContentLoaded', () => {
    const allowedUser = 'h';
    const allowedPassword = 'h';

    document.getElementById('loginForm')?.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = this.username.value;
        const password = this.password.value;

        if (username === allowedUser && password === allowedPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password!');
        }
    });

    // Check for access on protected page
    if (window.location.pathname.endsWith('dashboard.html')) {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            document.body.innerHTML = 'You are not logged in.';
            setTimeout(() => window.close(), 2000);
        }
    }
  
  // Profit Percentage Calculator
    document.getElementById('calculatePercentage').addEventListener('click', () => {
        const profits = parseFloat(document.getElementById('profits').value);
        const totalEarned = parseFloat(document.getElementById('totalEarned').value);

        if (!isNaN(profits) && !isNaN(totalEarned) && totalEarned > 0) {
            const percentage = (profits / totalEarned) * 100;
            document.getElementById('percentageResult').textContent = `Your profit percentage is ${percentage.toFixed(2)}%`;
        } else {
            document.getElementById('percentageResult').textContent = 'Please enter valid numbers.';
        }
    });

    // Profit Per Sale Calculator
    document.getElementById('calculateProfit').addEventListener('click', () => {
        const productCost = parseFloat(document.getElementById('productCost').value);
        const cutPercentage = parseFloat(document.getElementById('cutPercentage').value) / 100;

        if (!isNaN(productCost) && !isNaN(cutPercentage)) {
            const profit = productCost * cutPercentage;
            document.getElementById('profitResult').textContent = `Your profit per sale is $${profit.toFixed(2)}`;
        } else {
            document.getElementById('profitResult').textContent = 'Please enter valid numbers.';
        }
    });
});
