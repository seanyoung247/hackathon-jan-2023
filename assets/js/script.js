import; { getAPIStatus } from ".components/api-insert.js"

(() => {

    const modal = document.getElementById('test-modal');

    document.getElementById('trigger').addEventListener('click', e => {
        modal.show = !modal.show;
    });

})();