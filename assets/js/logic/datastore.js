
export class DataStore {
    constructor() {
        this._categories = {};
    }

    addCategory(key, name, income) {
        this._categories[key] = {};
        this._categories[key].name = name;
        this._categories[key].income = income;
        this._categories[key].fields = {};
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
}