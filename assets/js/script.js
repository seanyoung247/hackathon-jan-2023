
import { getAPIStatus } from "./components/api-insert.js";

(() => {

    const modal = document.getElementById('input-modal');
    const moneyInputs = document.getElementById('money-inputs');

    function showCategoryModal(e) {
        modal.show = !modal.show;
    }

    document.getElementById('income-btn').addEventListener('click', e => {
        modal.show = !modal.show;
    });

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