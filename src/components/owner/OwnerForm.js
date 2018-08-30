import React, { Component } from "react"

export default class OwnerForm extends Component {
    // Set initial state
    state = {
        ownerName: "",
        ownerPhoneNumber: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating owner object, and
        invoking the function reference passed from parent component
     */
    constructNewEmployee = evt => {
            evt.preventDefault()
            const owner = {
                name: this.state.ownerName,
                phoneNumber: this.state.ownerPhoneNumber
            }

            // Create the owner and redirect user to owner list
            this.props.addOwner(owner).then(() => this.props.history.push("/owners"))
        
    }

    render() {
        return (
            <React.Fragment>
                <form className="employeeForm">
                    <div className="form-group">
                        <label htmlFor="ownerName">Owner name</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="ownerName"
                               placeholder="Owner name" />
                    </div>
                    <div>
                        <label htmlFor="ownerPhoneNumber">Owner Phone Number</label>
                        <input type="text" required="true"
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="ownerPhoneNumber"
                               placeholder="1111111111" />
                    </div>
                    <button type="submit" onClick={this.constructNewEmployee} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}