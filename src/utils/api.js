

const api = {
    get(path) {
        console.log("GET request on path: " + path);
        return fetch(path).then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            throw(resp);
        }).catch((err) => {
            console.error('Error in ' + path + ' request. ' + err);
        });
    },
    put(path, body) {
        return fetch(path, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    },
    post(path, body){
        return fetch(path, {
            method: 'POST',
            body : JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
};

export default api;