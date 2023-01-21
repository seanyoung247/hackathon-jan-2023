
export class DataStore {
    constructor() {
        this._categories = {};
    }

    addCategory(key, name, income) {
        this._categories[key] = {
            name, income, fields: {}
        };
    }

    getCategory(key) {
        return this._categories[key];
    }

    setField(category, key, value) {
        this._categories[category].fields[key] = value;
    }

    getField(category, key) {
        return this._categories[category].fields[key];
    }

    /* TODO:
        - Local storage saving and loading values
        - Field enumeration
        - Value calculations
          - Total income
          - Total Expenditure
          - 
    */
}