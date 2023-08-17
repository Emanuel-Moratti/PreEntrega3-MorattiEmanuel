document.addEventListener('DOMContentLoaded', () => {
    const conversionRates = {
        usd: 0.00286, //1 USD equivale a 350 ARS apróx.
        eur: 0.0026, //1 EUR equivale a 380 ARS apróx.
        brl: 0.014 //1 BRL equivale a 70 ARS apróx.
    };

    const convertButton = document.getElementById('convert');
    const amountInput = document.getElementById('amount');
    const currencySelect = document.getElementById('currency');
    const resultDiv = document.getElementById('result');
    const historyDiv = document.getElementById('history');

    const conversionHistory = [];

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const selectedCurrency = currencySelect.value;

        if (isNaN(amount)) {
            resultDiv.innerHTML = 'Ingrese un monto válido.';
            return;
        }

        const convertedAmount = amount * conversionRates[selectedCurrency];

        const resultText = `${amount.toFixed(2)} ARS equivalen a ${convertedAmount.toFixed(2)} ${selectedCurrency.toUpperCase()}.`;
        resultDiv.innerHTML = resultText;

        const conversionData = {
            amount: amount.toFixed(2),
            currency: selectedCurrency.toUpperCase(),
            result: resultText
        };

        conversionHistory.push(conversionData);
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));

        updateHistory();
    });

    function updateHistory() {
        historyDiv.innerHTML = '';

    for (const conversion of conversionHistory) {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = `${conversion.amount} ARS a ${conversion.currency}: ${conversion.result}`;
        historyDiv.appendChild(historyItem);
    }
    }

    // Cargar historial desde el almacenamiento local al cargar la página
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
        conversionHistory.push(...JSON.parse(savedHistory));
        updateHistory();
    }
});