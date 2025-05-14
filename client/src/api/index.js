export function getRequest (endpoint) {
    const url = "http://localhost:3000/api/";
    return fetch(url + endpoint, {
        method: "GET",
        mode: "cors",
    }).then(res => res.json())
}