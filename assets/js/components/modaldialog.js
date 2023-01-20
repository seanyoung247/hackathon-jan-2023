import { WebComponent, loadTemplate, createComponent } from "./webcomponent.js";

export class ModalDialog extends WebComponent {
    static get tagName() { return 'modal-dialog'; }

    static get attributes() {
        return {
            'show': {type: Boolean, default: false}
        };
    }

    constructor() {
        super();
        this._createShadowDOM();
        this._container = this.shadowRoot.getElementById('modal-container');
        this._dialog = this.shadowRoot.getElementById('modal-dialog');
    }

    get show() { return this._show; }
    set show(val) {
        this._show = val;
        if (val) {
            this._container.classList.add('show');
            this.setAttribute('show', true);
        } else {
            this._container.classList.remove('show');
            this.removeAttribute('show');
        }
    }

    onStart() {
        this._container.addEventListener('click', () => {
            this.show = false;
        });
        this._dialog.addEventListener('click', e => {
            e.stopPropagation();
        });
    }
}

const templateUrl = new URL('modaldialog.html', import.meta.url).href;
loadTemplate(templateUrl)
    .then(template => createComponent(ModalDialog, template));