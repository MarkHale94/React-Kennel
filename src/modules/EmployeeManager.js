const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    post: {
        value: function (newEmployee) {
            return fetch(`${remoteURL}/employees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEmployee)
            }).then(e => e.json())
        }
    },
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