const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    post: {
        value: function (newAnimal) {
            return fetch(`${remoteURL}/animals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAnimal)
            }).then(e => e.json())
        }
    },
    get: {
        value: function (id) {
            return fetch(`${remoteURL}/animals/${id}`).then(e => e.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${remoteURL}/animals`).then(e => e.json())
        }
    }
})