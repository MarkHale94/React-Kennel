import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import LocationManager from "../modules/LocationManager"
import OwnerManager from "../modules/OwnerManager"
import AnimalDetail from './animal/AnimalDetail'
import OwnerDetail from './owner/OwnerDetail'
import LocationDetail from './location/LocationDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import AnimalForm from './animal/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owner/OwnerForm'
import Login from './Login'
import { Route, Redirect } from "react-router-dom"

export default class ApplicationViews extends Component {

    // Check if credentials are in local storage
    isAuthenticated = () => localStorage.getItem("credentials") !== null


    state = {
        locations: [],
        animals: [],
        employees: [],
        owners: []
    }

    componentDidMount() {
    
        AnimalManager.getAll().then(allAnimals => {
            this.setState({
                animals: allAnimals
            })
        })
        .then(EmployeeManager.getAll().then(allEmployees => {
            this.setState({
                employees: allEmployees
            })
        }))
        .then(LocationManager.getAll().then(allLocations => {
            this.setState({
                locations: allLocations
            })
        }))
        .then(OwnerManager.getAll().then(allOwners => {
            this.setState({
                owners: allOwners
            })
        }))
    }

    addAnimal = animal => AnimalManager.post(animal)
    .then(() => AnimalManager.getAll())
    .then(animals => this.setState({
        animals: animals
    }))

    deleteAnimal = id => {
        return fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/animals`))
        .then(e => e.json())
        .then(animals => this.setState({
            animals: animals
        }))
    }
    hireEmployee = employee => EmployeeManager.post(employee)
    .then(() => EmployeeManager.getAll())
    .then(employees => this.setState({
        employees: employees
    }))

    fireEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/employees`))
        .then(e => e.json())
        .then(employees => this.setState({
            employees: employees
        }))
    }
    addOwner = owner => OwnerManager.post(owner)
    .then(() => OwnerManager.getAll())
    .then(owners => this.setState({
        owners: owners
    }))
    removeOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/owners`))
        .then(e => e.json())
        .then(owners => this.setState({
            owners: owners
        }))
    }
    

    
    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
                <Route exact path="/" render={(props) => {
                    if (this.isAuthenticated()) {return <LocationList locations={this.state.locations} />
                } else {
                    return <Redirect to="/login" />
                }
                }} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {return <LocationDetail {...props} locations={this.state.locations} />
                } else {
                    return <Redirect to="/login" />
                }
                }} />
                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {return <AnimalList {...props}
                                    deleteAnimal={this.deleteAnimal}
                                    animals={this.state.animals} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />

                <Route path="/animals/new" render={(props) => {
                    if (this.isAuthenticated()) {return <AnimalForm {...props}
                                    addAnimal={this.addAnimal}
                                    employees={this.state.employees} />
                                } else {
                                    return <Redirect to="/login" />
                                }
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                } else {
                    return <Redirect to="/login" />
                }
                }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props} deleteEmployee={this.deleteEmployee}
                                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/employees/new" render={(props) => {
                    if (this.isAuthenticated()) {return <EmployeeForm {...props}
                                    hireEmployee={this.hireEmployee}/>
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {return <EmployeeDetail {...props} fireEmployee={this.fireEmployee} employees={this.state.employees} />
                } else {
                    return <Redirect to="/login" />
                }
                }} />
                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {return <OwnerList {...props} removeOwner={this.removeOwner} owners={this.state.owners} />
                } else {
                    return <Redirect to="/login" />
                }
                }} />
                <Route path="/owners/new" render={(props) => {
                    if (this.isAuthenticated()) {return <OwnerForm {...props}
                    addOwner={this.addOwner}/>
                } else {
                    return <Redirect to="/login" />
                }
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {return <OwnerDetail {...props} removeOwner={this.removeOwner} owners={this.state.owners} />
                } else {
                    return <Redirect to="/login" />
                }
                }} />
                
            </React.Fragment>
        )
    }
}