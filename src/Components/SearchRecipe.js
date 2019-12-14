import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import RecipeShort from './RecipeShort';
import './css/SearchRecipe.css';
import PropTypes from 'prop-types';

class SearchRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = { searchedRecaipes: [] };
        let fieldProps = props.fields;
        Object.keys(fieldProps).map(el => {
            let val = fieldProps[el];
            if (val.length > 1) this.state[el] = val[1];
            else this.state[el] = "";
            return this.state;
        });

    }

    searchVal(name, event) {

        let value = event.target.value;
        this.setState({ [name]: value }, () => {
            let item = this.state[name];
            axios({
                method: 'GET',
                url: "http://localhost:8080/Recipes/" + item
            }).then(res => {
                
                this.setState({
                    searchedRecaipes: res.data
                });

            }).catch(error => console.error('Error', error));
        });

    }

    // getSingleData(name, event) {
    //     event.preventDefault();
    //     let item = this.state[name];
    //     axios({
    //         method: 'GET',
    //         url: "http://localhost:8080/Recipes/" + item
    //     }).then(res => {
    //         console.log(res.data);
    //         this.setState({
    //             searchedRecaipes: res.data
    //         });

    //     }).catch(error => console.error('Error', error));

    // }

    render() {
        return <div className="search">
            <form>
                {Object.keys(this.props.fields).map(field => {
                    let arr = this.props.fields[field];
                    if (arr.length > 1) {
                        return <p key={field}>
                            <input className="searchbox" name={field} type={arr[0]} defaultValue={arr[1]} onChange={this.searchVal.bind(this, field)} />
                            {/* <button className="btn btn-success" name={field} onClick={this.getSingleData.bind(this, field)}>Search</button> */}
                        </p>
                    }
                    else return <p key={field}>
                        <input className="searchbox" name={field} type={arr[0]} onChange={this.searchVal.bind(this, field)} />
                        {/* <button className="btn btn-success" name={field} onClick={this.getSingleData.bind(this, field)}>Search</button> */}
                    </p>
                })}


            </form>

            {this.state.searchedRecaipes.length !== 0 ?
                <div className="row justify-content-around">
                    {this.state.RecipeName !== "" ? <RecipeShort Recipes={this.state.searchedRecaipes} clickRecipe={this.props.clickRecipe} /> : <p>Brak wyników</p>}
                </div> : <p>Brak wyników</p>}

            <Link to="/"><button className="btnAdd btn btn-primary currBtn">Powrót</button></Link>
        </div>


    }
}

SearchRecipe.propTypes={
    fields: PropTypes.object,
    clickRecipe: PropTypes.func
}


export default SearchRecipe;
