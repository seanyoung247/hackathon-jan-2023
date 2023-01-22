
import { getAPIStatus } from "./components/api-insert.js";
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
            input.cost = value.cost;
            input.frequency = value.freq;
            moneyInputs.appendChild(input);
        }
        document.getElementById('category-total').innerText = dataStore.getCategoryTotal(categoryName);

        modal.show = true;
    }
    document.getElementById('income-btn').addEventListener('click', showCategoryModal);
    document.getElementById('home-btn').addEventListener('click', showCategoryModal);
    document.getElementById('transport-btn').addEventListener('click', showCategoryModal);
    document.getElementById('entertainment-btn').addEventListener('click', showCategoryModal);

    document.getElementById('close-modal').addEventListener('click', e => {
        modal.show = false;
        clearModal();
    });

    moneyInputs.addEventListener('change', e => {
        // Add or update the changed field in the dataStore
        dataStore.setField(
            modal.dataset.category, 
            e.target.key, 
            {
                cost: e.target.cost, 
                freq: e.target.frequency
            }
        );
        updateCategoryTotal();
    });

    freqEl.addEventListener('change', e => {
        updateCategoryTotal();
    });

    moneyInputs.addEventListener('delete-input', e => {
        updateCategoryTotal();
    });

    document.getElementById('add-input').addEventListener('click', e => {
        const input = document.createElement('money-input');
        moneyInputs.appendChild(input);
    });

})();
