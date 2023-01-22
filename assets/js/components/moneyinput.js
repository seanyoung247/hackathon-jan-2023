import { WebComponent, loadTemplate, createComponent } from "./webcomponent.js";

export class MoneyInput extends WebComponent {
    static get tagName() { return 'money-input'; }

    static get attributes() {
        return {
            'key': {type: String, default: ''},
            'name': {type: String, default: ''},
            'cost': {type: Number, default: 0},
            'frequency': {type: String, default: 'weekly'}
        }
    }

    constructor() {
        super();
        this._createShadowDOM();
        this._nameEl = this.shadowRoot.getElementById('name');
        this._valueEl = this.shadowRoot.getElementById('value');
        this._frequencyEl = this.shadowRoot.getElementById('frequency');
        this._delBtnEl = this.shadowRoot.getElementById('field-delete');
    }

    get name() { return this._name; }
    set name(val) {
        if (val != this._name) {
            this._name = val;
            this._nameEl.value = val;
            this.setAttribute('name', val);
            this.dispatchEvent(new Event('change', {bubbles: true} ));
        }
    }

    get cost() { return this._cost; }
    set cost(val) {
        if (val != this._cost) {
            this._cost = val;
            this._valueEl.value = val.toFixed(2);
            this.setAttribute('cost', val);
            this.dispatchEvent(new Event('change', {bubbles: true} ));
        }
    }

    get frequency() { return this._frequency; }
    set frequency(val) {
        const options = ['weekly', 'monthly', 'quarterly', 'yearly'];
        val = val.toLowerCase();
        if (options.includes(val)) {
            this._frequencyEl.value = val;
            this._frequency = val;
        }
        this.setAttribute('frequency', this._frequency);
        this.dispatchEvent(new Event('change', {bubbles: true} ));
    }

    onStart() {
        this._nameEl.addEventListener('change', e => {
            this.name = e.target.value;
        });
        this._valueEl.addEventListener('change', e => {
            this.cost = parseFloat(e.target.value);
        });
        this._frequencyEl.addEventListener('change', e => {
            this.frequency = e.target.value;
        });
        this._delBtnEl.addEventListener('click', e => {
            this.dispatchEvent(new CustomEvent('delete-input', {detail: this._key, bubbles: true}));
            this.remove();
        });
    }
}


const templateUrl = new URL('moneyinput.html', import.meta.url).href;
loadTemplate(templateUrl)
    .then(template => createComponent(MoneyInput, template));