async function getAccessToken() {
    const clientId = 'AWR2cN44riQEjgZ0vi2xSDYmf5zwR6lvXOYxzISgRmPeJquBLIm2gExP5KvUjkUsPA_B6aG2u2sBtONH'; // Replace with your client ID
    const clientSecret = 'example_paypal_client_secret_placeholder'; // Replace with your client secret
    const base64Credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

async function getTransactions(accessToken) {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0] + 'T00:00:00Z'; // Start from the beginning of today
    const transactionsUrl = `https://api-m.sandbox.paypal.com/v1/reporting/transactions?start_date=${startDate}&fields=all&page_size=100&page=1`;

    const response = await fetch(transactionsUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const transactions = await response.json();
    return transactions;
}

async function displayTransactions() {
    try {
        const accessToken = await getAccessToken();
        const transactions = await getTransactions(accessToken);
        
        // Assuming transactions is an array and you want to display it as a string
        document.getElementById('emailOutput').textContent = JSON.stringify(transactions, null, 2);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

// Call the function to display transactions
displayTransactions();
