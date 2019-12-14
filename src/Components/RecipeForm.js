import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './css/AddRecipe.css';
import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types';

class RecipeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            added: false,
            edit: false,
            editedRecipe: null,
            nrIngredientToEdit: -1,

        };

        let fieldProps = props.fields;
        Object.keys(fieldProps).map(el => {
            let val = fieldProps[el];
            if (val.length > 1) this.state[el] = val[1];
            else this.state[el] = "";
            return this.state;
        });

    }

    // formValidation = () => {
    //     let title = false;
    //     let url = false;
    //     let desc = false;
    //     if (this.state['title'] < 5) title = true;
    //     return title;
    // }

    messages = {
        title_incorrect: 'Nazwa musi być dłuższa niż 5 znaków',
        url_incorrect: 'Adres musi zaczynać się od http:// lub https://',
        description_incorrect: 'Opis musi być dłuższy niż 20 znaków',
        ingredient_incrorrect: 'Podaj nazwę/składnik już istnieje',
    }

    changeVal(name, event) {

        // VALIDATION  
        if (name === 'title') {
            if (event.target.value.length < 5) this.setState({ errorstitle: true });
            else this.setState({ errorstitle: false });
        }

        if (name === 'url') {
            if (event.target.value.substr(0, 7) !== "http://" && event.target.value.substr(0, 8) !== "https://") this.setState({ errorsurl: true });
            else this.setState({ errorsurl: false });
        }

        if (name === 'description') {
            if (event.target.value.length < 20) this.setState({ errorsdesc: true });
            else this.setState({ errorsdesc: false });
        }

        if (this.props.type === "add") {
            this.setState({
                [name]: event.target.value
            })
        }
        else if (this.props.type === "edit") {
            let st = Object.assign({}, this.state.editedRecipe);
            let newValue = event.target.value;
            for (let propName in st) {
                if (propName === name) {
                    st[propName] = newValue;
                }
            }
            this.setState({
                editedRecipe: st
            })
        }

    }
    changeIngredientVal(fieldKey, event) {
        let st = Object.assign({}, this.state.editedRecipe);
      
        var newVal = event.target.value;

        if (fieldKey === 0) {
            st.ingredients[this.state.nrIngredientToEdit].name = newVal;
        }
        else if (fieldKey === 1) {
            st.ingredients[this.state.nrIngredientToEdit].amount = newVal
        }

        if (fieldKey === 'name') {
            let idx;
            let list = this.props.Recipes;
            let exists = false;
            if (list !== null) {
                list.forEach(el => {
                    if (el.id === this.props.selectedId) {
                        idx = list.indexOf(el);
                    }
                })
                this.props.Recipes[idx].ingredients.forEach(el => {
                    if (el.name === newVal) exists = true;

                })
            }

            if (exists === true || newVal.length < 1) this.setState({ errorsIngredientName: true });
            else this.setState({ errorsIngredientName: false });
        }

        if (fieldKey === 0) {
            let idx;
            let list = this.props.Recipes;
            let exists = 0;
            if (list !== null) {
                list.forEach(el => {
                    if (el.id === this.props.selectedId) {
                        idx = list.indexOf(el);
                    }
                })

                this.props.Recipes[idx].ingredients.forEach(el => {
                    if (el.name === newVal) exists++;
                })
            }

            if (exists > 1 || newVal.length < 1) this.setState({ errorsIngredientNameEdit: true });
            else this.setState({ errorsIngredientNameEdit: false });
        }

        this.setState({
            editedRecipe: st
        });

    }
    editIngredient(id, e) {
        this.setState({
            nrIngredientToEdit: id,
        });
    }
    addRecipe() {
        this.setState({
            added: true
        })
        this.props.addRecipe(this.state);
    }


    componentDidMount() {
        if (this.props.type === "edit") {
            let idx;
            let list = this.props.Recipes;
            if (list !== null) {
                list.forEach(el => {
                    if (el.id === this.props.selectedId) {
                        idx = list.indexOf(el);
                    }
                })
                this.setState({
                    editedRecipe: this.props.Recipes[idx],
                    errorsIngredientName: true,
                    errorsIngredientNameEdit: false
                })
            }
        }
        if (this.props.type === "add") {
            this.setState({
                errorstitle: true,
                errorsurl: true,
                errorsdesc: true
            })
        }
        else {
            this.setState({
                errorstitle: false,
                errorsurl: false,
                errorsdesc: false
            })
        }
    }
    finishEdit(e) {
        this.setState({
            edit: false,
            nrIngredientToEdit: -1
        });
        this.props.RecipeUpdate(this.state.editedRecipe);
    }
    addIngredient() {
        let st = Object.assign({}, this.state.editedRecipe);
        let newIngredient = {
            name: this.myInputName.value,
            amount: this.myInputAmount.value
        };
        st.ingredients.push(newIngredient);

        this.setState({
            editedRecipe: st
        });

        this.myInputName.value = "";
        this.myInputAmount.value = "";
        this.setState({ errorsIngredientName: true });
    }
    onDeleteIngredient() {
        let st = Object.assign({}, this.state.editedRecipe);
        
        st.ingredients.splice(this.state.nrIngredientToEdit, 1);
       
        this.setState({
            editedRecipe: st,
            nrIngredientToEdit: -1
        });
    }

    render() {
        if (this.props.type === "add") {
            return this.state.added ? <Redirect to={"/"} /> :
                <div className="col-sm-12 Recipe">
                    <h1 className="addTitle">Dodawanie Przepisu</h1>
                    <form className="addForm">
                        {Object.keys(this.props.fields).map(field => {
                            let arr = this.props.fields[field];
                            if (arr.length > 1) {
                                if (field === "description") {
                                    return <p key={field}>
                                        <textarea name="description" placeholder={arr[1]} onChange={this.changeVal.bind(this, field)} />
                                        {this.state.errorsdesc && <span className="validateError">{this.messages.description_incorrect}</span>}
                                    </p>
                                }
                                return <p key={field}>
                                    <input name={field} placeholder={arr[1]} type={arr[0]} onChange={this.changeVal.bind(this, field)} />
                                    {field === 'title' && this.state.errorstitle && <span className="validateError">{this.messages.title_incorrect}</span>}
                                    {field === 'url' && this.state.errorsurl && <span className="validateError">{this.messages.url_incorrect}</span>}
                                </p>
                            }
                            else return <p key={field}>
                                <input name={field} type={arr[0]} onChange={this.changeVal.bind(this, field)} />
                            </p>
                        })}
                    </form>

                    <p>
                        <Link to="/"><button className="btnAdd btn btn-primary" onClick={this.props.endClickRecipe}>Powrót</button></Link>
                        {this.state.errorsdesc === false && this.state.errorstitle === false && this.state.errorsurl === false && <Link to="/"><button className="btnAdd btn btn-success" onClick={this.addRecipe.bind(this)}>Dodaj</button></Link>}
                    </p>
                </div>
        }
        else if (this.props.type === "edit") {
            if (this.state.editedRecipe !== null) {
                return (
                    <div className="col-sm-12 Recipe">
                        <h1 className="addTitle">Edytowanie Przepisu</h1>
                        <form className="addForm" onSubmit={this.props.endClickRecipe}>
                            {Object.keys(this.props.fields).map(field => {
                                let arr = this.props.fields[field];

                                if (arr.length > 1) {
                                    if (field === "description") {
                                        return <p key={field}>
                                            <textarea name="description" placeholder={arr[1]} value={this.state.editedRecipe[field]} onChange={this.changeVal.bind(this, field)} />
                                            {this.state.errorsdesc && <span className="validateError">{this.messages.description_incorrect}</span>}
                                        </p>
                                    }
                                    return <p key={field}>
                                        <input name={field} defaultValue={this.state.editedRecipe[field]} type={arr[0]} onChange={this.changeVal.bind(this, field)} />
                                        {field === 'title' && this.state.errorstitle && <span className="validateError">{this.messages.title_incorrect}</span>}
                                        {field === 'url' && this.state.errorsurl && <span className="validateError">{this.messages.url_incorrect}</span>}
                                    </p>

                                }
                                else {
                                    if (field === "description") {
                                        return <p key={field}>
                                            <textarea name="description" value={this.state.editedRecipe[field]} onChange={this.changeVal.bind(this, field)} />
                                            {this.state.errorsdesc && <span className="validateError">{this.messages.description_incorrect}</span>}
                                        </p>
                                    }
                                    return <p key={field}>
                                        <input name={field} defaultValue={this.state.editedRecipe[field]} type={arr[0]} onChange={this.changeVal.bind(this, field)} />
                                        {field === 'title' && this.state.errorstitle && <span className="validateError">{this.messages.title_incorrect}</span>}
                                        {field === 'url' && this.state.errorsurl && <span className="validateError">{this.messages.url_incorrect}</span>}
                                    </p>
                                }

                            })}
                            <div className="col-sm-12 Recipe row">

                                <div className="col-sm-12 col-md-6">
                                    <h1 className="addTitle">Edytowanie listy</h1>
                                    <h6 className="helperTitle">Wybierz element z list w celu edycji:</h6>
                                    <ul>
                                        {this.state.editedRecipe.ingredients.map((el, index) => {
                                            if (index !== this.state.nrIngredientToEdit) return <li className="list" onClick={this.editIngredient.bind(this, index)} key={el.name + el.amount}>
                                                {el.name + " " + el.amount}
                                            </li>
                                            else return <li key={index}>
                                                <div>
                                                    {Object.values(el).map((field, fieldKey) => {
                                                        return <input type="text" className="searchbox" key={fieldKey} defaultValue={field} onChange={this.changeIngredientVal.bind(this, fieldKey)} />
                                                    }, this)}
                                                    {this.state.errorsIngredientNameEdit && <span className="validateError">{this.messages.ingredient_incrorrect}</span>}
                                                    <div>
                                                        {!this.state.errorsIngredientNameEdit && <button className="btn btn btn-success" onClick={this.finishEdit.bind(this)} type="button">Aktualizuj</button>}
                                                        <button className="btn btn-danger" type="button" onClick={this.onDeleteIngredient.bind(this)}>Usuń</button>
                                                    </div>
                                                </div></li>
                                        }
                                        )}
                                    </ul>

                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <h1 className="addTitle">Dodawnanie do Listy</h1>
                                    <input className="searchbox" type="text" name="name" ref={input => { this.myInputName = input; }} placeholder="Podaj nazwe składnika" onChange={this.changeIngredientVal.bind(this, "name")} />
                                    {this.state.errorsIngredientName && <span className="validateError">{this.messages.ingredient_incrorrect}</span>}
                                    <input className="searchbox" type="text" name="amount" ref={input => { this.myInputAmount = input; }} placeholder="Podaj ilość składnika" onChange={this.changeIngredientVal.bind(this, "amount")} />
                                    <br />
                                    {!this.state.errorsIngredientName && <button className="btn btn-primary" type="button" onClick={this.addIngredient.bind(this)} >Dodaj składnik</button>}
                                </div>
                            </div>
                            <p>
                                {this.state.errorsdesc === false && this.state.errorstitle === false && this.state.errorsurl === false && <Link to="/details"><button className="btnAdd btn btn-success" onClick={this.finishEdit.bind(this)}>Aktualizuj</button></Link>}
                            </p>
                        </form>
                    </div>
                );
            }

            return (
                <div className="col-sm-12 Recipe">
                    <p className="nonexist">Nie znaleziono takiego przepisu!</p>
                    <Link to="/"><button className="btn btn-primary" onClick={this.props.endClickRecipe}>Powrót</button></Link>
                </div>
            )
        }

    }
}
RecipeForm.propTypes={
    type: PropTypes.oneOf(["add","edit"]),
    fields: PropTypes.object,
    addRecipe: PropTypes.func,
    RecipeUpdate: PropTypes.func,
    selectedId: PropTypes.number,
    endClickRecipe: PropTypes.func
}
export default RecipeForm;