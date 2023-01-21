import { WebComponent, loadTemplate, createComponent } from "./webcomponent.js";

export class MoneyInput extends WebComponent {
    static get tagName() { return 'money-input'; }

    static get attributes() {
        return {
            'key': {type: String, default: ''},
            'cost': {type: Number, default: 0},
            'frequency': {type: String, default: 'weekly'}
        }
    }

    constructor() {
        super();
        this._createShadowDOM();
        this._keyEl = this.shadowRoot.getElementById('key');
        this._valueEl = this.shadowRoot.getElementById('value');
        this._frequencyEl = this.shadowRoot.getElementById('frequency');
        this._delBtnEl = this.shadowRoot.getElementById('field-delete');
    }

    get key() { return this._key; }
    set key(val) {
        if (val != this._key) {
            this._key = val;
            this.setAttribute('value', val);
            this.dispatchEvent(new Event('change'));
        }
    }

    get cost() { return this._cost; }
    set cost(val) {
        if (val != this._cost) {
            this._cost = val;
            this.setAttribute('value', val);
            this.dispatchEvent(new Event('change'));
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
        this.dispatchEvent(new Event('change'));
    }

    onStart() {
        this._keyEl.addEventListener('change', e => {
            this.key = e.target.value;
        });
        this._valueEl.addEventListener('change', e => {
            this.cost = e.target.value;
        });
        this._frequencyEl.addEventListener('change', e => {
            this.frequency = e.target.value;
        });
        this._delBtnEl.addEventListener('click', e => {
            console.log(this._key);
            this.dispatchEvent(new CustomEvent('delete-input', {detail: this._key}));
            this.remove();
        });
    }
}


const templateUrl = new URL('moneyinput.html', import.meta.url).href;
loadTemplate(templateUrl)
    .then(template => createComponent(MoneyInput, template));