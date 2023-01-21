import { WebComponent, loadTemplate, createComponent } from "./webcomponent.js";

export class MoneyInput extends WebComponent {
    static get tagName() { return 'money-input'; }

    static get attributes() {
        return {
            'key': {type: String, default: ''},
            'value': {type: Number, default: 0}
        }
    }

    constructor() {
        super();
        this._createShadowDOM();
        this._key = this.shadowRoot.getElementById('key');
        this._frequency = this.shadowRoot.getElementById('frequency')
    }
}


const templateUrl = new URL('moneyinput.html', import.meta.url).href;
loadTemplate(templateUrl)
    .then(template => createComponent(MoneyInput, template));