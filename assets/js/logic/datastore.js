
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
    getCategoryTotal(category, frequency='weekly') {
        let total = 0;
        for (const field of Object.values(this._categories[category].fields)) {
            total += toWeekly(field.cost, field.freq);
        }
        return fromWeekly(total, frequency);
    }

    getTotalIncome(frequency='weekly') {}
    getTotalExpenses(frequency='weekly') {}
    getDisposableIncome(frequency='weekly') {}


    /* TODO:
        - Local storage saving and loading values
        - Value calculations
          - Total income
          - Total Expenditure
          - Category totals
    */
}

// Category total (at the bottom of the modal). Total income, total expenses, and remaining income after expenses
const factor = {
    'weekly': 1,
    'monthly': 4.33,
    'quarterly': 13,
    'yearly': 52
}

function toWeekly(value, frequency) {
    if (value) return value / factor[frequency];
    return 0;
}

function fromWeekly(value, frequency) {
    if (value) return value * factor[frequency];
    return 0;
}