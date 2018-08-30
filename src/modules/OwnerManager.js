const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    post: {
        value: function (newOwner) {
            return fetch(`${remoteURL}/owners`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newOwner)
            }).then(e => e.json())
        }
    },
    get: {
        value: function (id) {
            return fetch(`${remoteURL}/owners/${id}`).then(e => e.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${remoteURL}/owners`).then(e => e.json())
        }
    }
})