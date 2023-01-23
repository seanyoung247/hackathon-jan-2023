import { convertCurrency } from "./api-insert.js";
import { DataStore } from "./logic/datastore.js";

(() => {

    const modal = document.getElementById('input-modal');
    const modalTitle = document.getElementById('modal-title');
    const moneyInputs = document.getElementById('money-inputs');
    const totalEl = document.getElementById('category-total');
    const freqEl = document.getElementById('category-total-frequency');

    const dataStore = new DataStore();
    dataStore.addCategory('income', 'Income', true);
    dataStore.addCategory('home', 'Home expenses', false);
    dataStore.addCategory('transport', 'Transport', false);
    dataStore.addCategory('entertainment', 'Entertainment', false);
    updateOutputs();

    function updateCategoryTotal() {
        const frequency = freqEl.value;
        totalEl.value = 
        dataStore.getCategoryTotal(
            modal.dataset.category,
            frequency
        ).toFixed(2);
    }

    function clearModal() {
        modal.dataset.category = 'none';
        modalTitle.innerText = '';
        moneyInputs.innerText = '';
    }

    function showCategoryModal(e) {
        // Get the current category
        const categoryName = this.dataset.category
        const category = dataStore.getCategory(categoryName);
        clearModal();
        // Set the modal title and data attribute to the current category
        modalTitle.innerText = category.name;
        modal.dataset.category = categoryName;
        // Create money-inputs for all the fields of this category
        for (const [key,value] of dataStore.fieldList(categoryName)) {
            const input = document.createElement('money-input');
            input.key = key;
            input.name = value.name;
            input.cost = value.cost;
            input.frequency = value.freq;
            moneyInputs.appendChild(input);
        }
        updateCategoryTotal();

        modal.show = true;
    }
    document.getElementById('income-btn').addEventListener('click', showCategoryModal);
    document.getElementById('home-btn').addEventListener('click', showCategoryModal);
    document.getElementById('transport-btn').addEventListener('click', showCategoryModal);
    document.getElementById('entertainment-btn').addEventListener('click', showCategoryModal);

    document.getElementById('close-modal').addEventListener('click', e => {
        modal.show = false;
        clearModal();
        // Do main page recalculations now...
    });

    function updateOutputs() {
        const freqSelect = document.getElementById('total-frequency');
        const totIncome = document.getElementById('total-income');
        const totExpenses = document.getElementById('total-expenses');
        const totDisposable = document.getElementById('total-disposable');
        totIncome.value = dataStore.getTotalIncome(freqSelect.value).toFixed(2);
        totExpenses.value = dataStore.getTotalExpenses(freqSelect.value).toFixed(2);
        totDisposable.value = dataStore.getDisposableIncome(freqSelect.value).toFixed(2);
    }
    document.getElementById('total-frequency').addEventListener('change', updateOutputs);

    moneyInputs.addEventListener('change', e => {
        // Add or update the changed field in the dataStore
        dataStore.setField(
            modal.dataset.category, 
            e.target.key,
            {
                name: e.target.name, 
                cost: e.target.cost, 
                freq: e.target.frequency
            }
        );
        updateCategoryTotal();
        updateOutputs();
    });

    freqEl.addEventListener('change', e => {
        updateCategoryTotal();
    });

    moneyInputs.addEventListener('delete-input', e => {
        dataStore.removeField(modal.dataset.category, e.target.key);
        updateCategoryTotal();
    });

    document.getElementById('add-input').addEventListener('click', e => {
        const input = document.createElement('money-input');
        const fieldId = dataStore.getFieldId(modal.dataset.category);
        input.key = `${modal.dataset.category}_${fieldId}`;
        moneyInputs.appendChild(input);
    });

    document.getElementById('btn-convert').addEventListener('click', e => {
        const fromCurrency = document.getElementById('currency-from').value;
        const toCurrency = document.getElementById('currency-to').value;
        const fromValue = parseFloat(document.getElementById('from-currency-value').value);
        const toValueEl = document.getElementById('to-currency-value');
        toValueEl.value = 0.00;
        if (fromValue) {
            convertCurrency(fromCurrency, toCurrency, fromValue)
                .then(data => toValueEl.value = data.toFixed(2));
        }
    });

})();
