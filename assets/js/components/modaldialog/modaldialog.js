import { WebComponent, loadTemplate, createComponent } from "../webcomponent.js";

export class ModalDialog extends WebComponent {
    static get tagName() { return 'modal-dialog'; }

    static get attributes() {
        return {};
    }

    constructor() {
        super();
        this._createShadow();
        this._container = this.shadowRoot.getElementById('modal-container');
        this._dialog = this.shadowRoot.getElementById('modal-dialog');
    }

    toggle() {
        this._container.classList.toggle('show'); 
    }

    show() {
        this._container.classList.add('show');
    }

    hide() {
        this._container.classList.remove('show');
    }

    connectedCallback() {
        this._container.addEventListener('click', e => {
            this.hide();
        });
        this._dialog.addEventListener('click', e => {
            e.stopPropagation();
        });
    }
}

const templateUrl = new URL('modaldialog.html', import.meta.url).href;
loadTemplate(templateUrl)
    .then(template => createComponent(ModalDialog, template));