import React, { Component } from 'react';

import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';

class EditReceipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            editedReceipe: null,
        }
    }

    componentDidMount() {
        let idx;
        let list = this.props.receipes;
        if (list !== null) {
            list.forEach(el => {
                if (el.id === this.props.selectedId) {
                    idx = list.indexOf(el);
                }
            })
            this.setState({
                editedReceipe: this.props.receipes[idx]
            })
        }
    }

    finishEdit(e) {
        this.setState({
            edit: false,
        });
        this.props.receipeUpdate(this.state.editedReceipe);
    }

    changeVal(name, event) {
        // this.setState({
        //     [name]: event.target.value
        // })
        if (name === 'title') {
            let st = Object.assign({}, this.state.editedReceipe);
            st.title = event.target.value;
            this.setState({
                editedReceipe: st
            })
        }
    }

    // editReceipe(e){
    //     this.setState({
    //         edit: true,
    //         editedReceipe: this.props.receipes[this.props.selectedId]
    //     })
    // }

    render() {
        if (this.state.editedReceipe !== null) {
            return (
                <div className="col-sm-12 receipe">
                    <h1 className="addTitle">Edytowanie Przepisu</h1>
                    <form className="addForm" onSubmit={this.props.endClickReceipe}>
                        <p><input name="title" placeholder="Nazwa przepisu" value={this.state.editedReceipe.title} type="text" onChange={this.changeVal.bind(this, 'title')} /></p>
                        <p><input name="url" placeholder="Adres url do zdjęcia" value={this.state.editedReceipe.url} type="text" onChange={this.changeVal.bind(this, 'url')} /></p>
                        <p><textarea name="description" placeholder="Dodaj opis przepisu" value={this.state.editedReceipe.description} onChange={this.changeVal.bind(this, 'description')} /></p>
                        <p>
                            <Link to="/details"><button className="btnAdd btn btn-success" onClick={this.finishEdit.bind(this)}>Aktualizuj</button></Link>
                        </p>
                    </form>
                </div>
            );
        }

        return (
            <div className="col-sm-12 receipe">
                <p>Nie znaleziono takiego przepisu!</p>
                <Link to="/"><button className="btn btn-primary" onClick={this.props.endClickReceipe}>Powrót</button></Link>
            </div>
        )
    }
}

export default EditReceipe;