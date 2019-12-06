
const server = "http://localhost:8080"

const api = {
    get(path) {
        console.log("GET request to " + path);
        return fetch(server+path).then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            throw(resp);
        }).catch((err) => {
            console.error('Error in ' + path + ' request. ' + err);
        });
    },
    put(path, body) {
        console.log("PUT request to " + path);
        //console.log(JSON.stringify(body));
        return fetch(server+path, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    },
    post(path, body){
        console.log("POST request to " + path);
        //console.log(body);
        return fetch(server+path, {
            method: 'POST',
            body : body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            throw(resp);
        }).catch((err) => {
            console.error('Error in ' + path + ' request. ' + err);
        });
    }
};

export default api;