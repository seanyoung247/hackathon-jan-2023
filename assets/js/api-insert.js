const API_URL = 'https://api.api-ninjas.com/v1/exchangerate';
const API_KEY = "XAPFls5LdIdYyVPHzAFfjw==wJu6w820CmmlKwBV";

// from https://api-ninjas.com/api/interestrate
export async function getExchangeRate(from, to) {
    const requestURL = `${API_URL}?pair=${from}_${to}`;
    const response = await fetch(requestURL, {
        method: 'GET',
        headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw new Error(data.error);
    }
}
