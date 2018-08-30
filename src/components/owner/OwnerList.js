import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class OwnerList extends Component {
    render() {
        return (<div>
            <div className="ownerButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/owners/new")}
                            }>
                        New Owner
                    </button>
                    </div>
            <section className="owners">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                    <div key={owner.id}>
                        <div>name: {owner.name}</div>
                    </div>
                    <Link className="nav-link" to={`/owners/${owner.id}`}>Details</Link>
                    <a href="#"
                            onClick={() => this.props.removeOwner(owner.id)}
                            className="card-link">Delete</a>
                            </h5>
                        </div>
                    </div>
                    
                )
            }
            </section>
            </div>
        )
    }
}