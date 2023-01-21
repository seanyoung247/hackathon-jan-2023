// import; { getAPIStatus } from ".components/api-insert.js"



(() => {

    const modal = document.getElementById('test-modal');

    document.getElementById('trigger').addEventListener('click', e => {
        modal.show = !modal.show;
    });

    document.getElementById('test-input').addEventListener('change', e => {
        console.log(e);
    });

    document.getElementById('test-input').addEventListener('delete-input', e => {
        console.log(e.detail);
    });

})();