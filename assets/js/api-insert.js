
const API_URL = 'https://api.api-ninjas.com/v1/exchangerate';
const API_KEY = "XAPFls5LdIdYyVPHzAFfjw==wJu6w820CmmlKwBV";

// from https://api-ninjas.com/api/interestrate
function getExchangeRate(from, to) {
    const requestURL = `${API_URL}?pair=${from}_${to}`;
    return new Promise((resolve, reject) => 
        fetch(requestURL, {
            method: 'GET',
            headers: {
                'X-API-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(reject)
    );
}

export function convertCurrency(from, to, value) {
    return new Promise((resolve, reject) => {
        getExchangeRate(from, to)
            .then(data => {
                const exr = data.exchange_rate;
                resolve(value / exr);
            })
            .catch(reject)
    });
}
