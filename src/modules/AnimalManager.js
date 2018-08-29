const remoteURL = "http://localhost:5002"

export default Object.create(null, {
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