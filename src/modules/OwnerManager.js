const remoteURL = "http://localhost:5002"

export default Object.create(null, {
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