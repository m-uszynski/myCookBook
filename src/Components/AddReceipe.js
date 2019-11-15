import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './css/AddReceipe.css';
import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';

class AddReceipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            added: false
        }
    }

    changeVal(name, event) {
        this.setState({
            [name]: event.target.value
        })
    }

    addStudent() {
        this.setState({
            added: true
        })
        this.props.addReceipe(this.state);
    }

    render() {
        return this.state.added ? <Redirect to={"/"} /> :
            <div className="col-sm-12 receipe">
                <h1 className="addTitle">Dodawanie Przepisu</h1>
                <form className="addForm">
                    <p><input name="title" placeholder="Nazwa przepisu" type="text" onChange={this.changeVal.bind(this, 'title')} /></p>
                    <p><input name="url" placeholder="Adres url do zdjęcia" type="text" onChange={this.changeVal.bind(this, 'url')} /></p>
                    <p><textarea name="description" placeholder="Dodaj opis przepisu" onChange={this.changeVal.bind(this, 'description')} /></p>
                    <p>
                        <Link to="/"><button className="btnAdd btn btn-primary" onClick={this.props.endClickReceipe}>Powrót</button></Link>
                        <Link to="/"><button className="btnAdd btn btn-success" onClick={this.addStudent.bind(this)}>Dodaj</button></Link>
                    </p>
                </form>
            </div>
    }
}

export default AddReceipe;