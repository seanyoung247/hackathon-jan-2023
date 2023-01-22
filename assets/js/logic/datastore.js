
export class DataStore {
    constructor() {
        this._categories = this.loadData();
    }

    /* Categories */
    addCategory(key, name, income) {
        if (key && !this._categories[key]) {
            this._categories[key] = {
                name, income, fieldId: 0, fields: {}
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

    getFieldId(key) {
        return this._categories[key].fieldId++;
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
            total += toYearly(field.cost, field.freq);
        }
        return fromYearly(total, frequency);
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

const factor = {
    'weekly': 52,       // 52 weeks in a year
    'monthly': 12,      // 12 months in a year
    'quarterly': 4,     // 4 quarters in a year
    'yearly': 1         // 1 year in a year
}

function toYearly(value, frequency) {
    if (value) return value * factor[frequency];
    return 0;
}

function fromYearly(value, frequency) {
    if (value) return value / factor[frequency];
    return 0;
}
