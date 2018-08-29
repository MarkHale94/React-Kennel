import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "./Kennel.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import App from "../App"


class Kennel extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
                {/* <App /> */}
            </React.Fragment>
        )
    }
}

export default Kennel