
import { getAPIStatus } from "./components/api-insert.js";
import { DataStore } from "./logic/datastore.js";

(() => {

    const modal = document.getElementById('input-modal');
    const modalTitle = document.getElementById('modal-title');
    const moneyInputs = document.getElementById('money-inputs');

    const dataStore = new DataStore();
    dataStore.addCategory('income', 'Income', true);
    dataStore.addCategory('home', 'Home expenses', false);
    dataStore.addCategory('transport', 'Transport', false);
    dataStore.addCategory('entertainment', 'Entertainment', false);


    function showCategoryModal(e) {
        const category = dataStore.getCategory(this.dataset.category);
        modalTitle.innerText = category.name;
        modal.dataset.category = this.dataset.category;

        modal.show = true;
    }
    document.getElementById('income-btn').addEventListener('click', showCategoryModal);

    document.getElementById('close-modal').addEventListener('click', e => {
        modal.show = false;
    });

    moneyInputs.addEventListener('change', e => {
        console.log(e);
    });

    moneyInputs.addEventListener('delete-input', e => {
        console.log(e.detail);
    });

    document.getElementById('add-input').addEventListener('click', e => {
        const input = document.createElement('money-input');
        moneyInputs.appendChild(input);
    });

})();