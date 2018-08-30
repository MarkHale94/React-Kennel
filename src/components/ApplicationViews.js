import { Route } from 'react-router-dom'
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

export default class ApplicationViews extends Component {

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
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    return <LocationDetail {...props} locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props}
                                    deleteAnimal={this.deleteAnimal}
                                    animals={this.state.animals} />
                }} />

                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                                    addAnimal={this.addAnimal}
                                    employees={this.state.employees} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route exact path="/employees" render={(props) => {
                    return <EmployeeList {...props} 
                                    fireEmployee={this.fireEmployee}
                                    employees={this.state.employees} />
                }} />
                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                                    hireEmployee={this.hireEmployee}/>
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props} fireEmployee={this.fireEmployee} employees={this.state.employees} />
                }} />
                <Route exact path="/owners" render={(props) => {
                    return <OwnerList {...props} removeOwner={this.removeOwner} owners={this.state.owners} />
                }} />
                <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                    addOwner={this.addOwner}/>
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail {...props} removeOwner={this.removeOwner} owners={this.state.owners} />
                }} />
                
            </React.Fragment>
        )
    }
}