
export class DataStore {
    constructor() {
        this._categories = {};
    }

    /* Categories */
    addCategory(key, name, income) {
        if (key) {
            this._categories[key] = {
                name, income, fields: {}
            };
        }
    }

    getCategory(key) {
        return this._categories[key];
    }

    categoryList() {
        return Object.entries(this._categories);
    }

    /* Data Fields */
    setField(category, key, value) {
        if (key) {
            this._categories[category].fields[key] = value;
        }
    }

    getField(category, key) {
        return this._categories[category].fields[key];
    }

    removeField(category, key) {
        delete this._categories[category].fields[key];
    }

    fieldList(category) {
        return Object.entries(this._categories[category].fields);
    }

    /* Persistent storage */

    /* Value calculations */

    /* TODO:
        - Local storage saving and loading values
        - Value calculations
          - Total income
          - Total Expenditure
          - Category totals
    */
}