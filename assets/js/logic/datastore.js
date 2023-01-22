
import { getExchangeRate } from "../api-insert.js";

console.log(getExchangeRate('USD', 'EUR'));

export class DataStore {
    constructor() {
        this._categories = this.loadData();
    }

    /* Categories */
    addCategory(key, name, income) {
        if (key && !this._categories[key]) {
            this._categories[key] = {
                name, income, fields: {}
            };
        }
        this.saveData();
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
        this.saveData();
    }

    getField(category, key) {
        return this._categories[category].fields[key];
    }

    removeField(category, key) {
        delete this._categories[category].fields[key];
        this.saveData();
    }

    fieldList(category) {
        return Object.entries(this._categories[category].fields);
    }

    /* Persistent storage */
    loadData() {
        const data = localStorage.getItem('userData');
        if (data) {
            const parsed = JSON.parse(data);

            return parsed;
        }
        return {};
    }
    saveData() {
        const data = JSON.stringify(this._categories);
        localStorage.setItem('userData', data);
    }

    /* Value calculations */
    getCategoryTotal(category, frequency='weekly') {
        let total = 0;
        for (const field of Object.values(this._categories[category].fields)) {
            total += toWeekly(field.cost, field.freq);
        }
        return fromWeekly(total, frequency);
    }

    getTotalIncome(frequency='weekly') {
        let total = 0;
        for (const [key,category] of Object.entries(this._categories)) {
            // Only count income categories
            if (category.income) {
                total += this.getCategoryTotal(key, frequency);
            }
            return total;
        }
    }

    getTotalExpenses(frequency='weekly') {
        let total = 0;
        for (const [key,category] of Object.entries(this._categories)) {
            // Only count expense categories
            if (!category.income) {
                total += this.getCategoryTotal(key, frequency);
            }
            return total;
        }
    }

    getDisposableIncome(frequency='weekly') {
        const income = this.getTotalIncome(frequency);
        const expenses = this.getTotalExpenses(frequency);
        return income - expenses;
    }
}

// Category total (at the bottom of the modal). Total income, total expenses, and remaining income after expenses
const factor = {
    'weekly': 1,        // One week in a week
    'monthly': 4.33,    // Average of 4.33 weeks in a month
    'quarterly': 13,    // 13 weeks in a quarter
    'yearly': 52        // 52 weeks in a year
}

function toWeekly(value, frequency) {
    if (value) return value / factor[frequency];
    return 0;
}

function fromWeekly(value, frequency) {
    if (value) return value * factor[frequency];
    return 0;
}