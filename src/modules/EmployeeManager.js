const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    get: {
        value: function (id) {
            return fetch(`${remoteURL}/employees/${id}`).then(e => e.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${remoteURL}/employees`).then(e => e.json())
        }
    }
})