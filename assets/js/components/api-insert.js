const API_URL = "https://api.api-ninjas.com/v1/interestrate";
const API_KEY = "XAPFls5LdIdYyVPHzAFfjw==wJu6w820CmmlKwBV";

// from https://api-ninjas.com/api/interestrate

//Asynchronous function - to handle a promise, wrap the promises in an async function and await the promise coming true.
export async function getAPIStatus(e) {
    // the queryString will consist of the URL and the parameters 
    // that we need to send over to the API with the GET request
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);

    // await instructions - when the response comes back, we need to 
    // convert it to json().  The json() method returns a response too
    // so we'll have to await that too.
    const data = await response.json();

    if (response.ok) {
        console.log(data); 
        // or use dot notation to drill down for specific result like console.log(data.expiry) to get the API Key expiry date
    } else {
        throw new Error(data.error);
    }

}
