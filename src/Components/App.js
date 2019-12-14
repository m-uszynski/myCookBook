import React, { Component } from 'react';
import './css/App.css';
import Header from './Header'
import RecipeShort from './RecipeShort'
import RecipeDetails from './RecipeDetails'
// import AddRecipe from './AddRecipe'
import SearchRecipe from './SearchRecipe';

import RecipeForm from './RecipeForm';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import axios from 'axios';
// import EditRecipe from './EditRecipe';


class App extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      selectedRecipe: -1,
      Recipes: null,
    }
  }

  componentDidMount() {
    this._isMounted = true;

    axios("http://localhost:8080/Recipes").then(res => {
      if (this._isMounted) {
        this.setState({
          Recipes: res.data
        });
      }
    }).catch(error => console.error('Error', error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onClickRecipe = (id) => {
    this.setState({
      selectedRecipe: id
    })
  }

  onEndClickRecipe = () => {
    this.setState({
      selectedRecipe: -1
    })
  }

  add(newRecipe) {
    let id = this.state.Recipes[this.state.Recipes.length - 1].id + 1;

    let Recipe2add = {
      id: id,
      title: newRecipe.title,
      url: newRecipe.url,
      description: newRecipe.description,
      ingredients: []
    };

    axios({
      url: "http://localhost:8080/Recipes",
      method: "POST",
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
      },
      data: JSON.stringify(Recipe2add)
    }).then(res => {
      if (res.status !== 304) {
        let list = this.state.Recipes;
        list.push(Recipe2add);
        this.setState({
          Recipes: list
        });
      } else throw new Error("Duplicate Recipe!");
    }).catch(error => console.error('Error', error));

  }

  remove = (index) => {
    axios({
      url: "http://localhost:8080/Recipes/" + index,
      method: "DELETE",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    }).then(res => {
      if (res.status !== 304) {
        let list = this.state.Recipes;
        let idx;
        list.forEach(el => {
          if (el.id === index) {
            idx = list.indexOf(el);
            list.splice(idx, 1);
          }
        });
        this.setState({
          Recipes: list
        })
      } else throw new Error("Recipe does not exist!");
    }).catch(error => console.error('Error', error));
  }

  onRecipeUpdate = (RecipeData) => {

    axios({
      url: "http://localhost:8080/Recipes",
      method: "PUT",
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
      },
      data: JSON.stringify(RecipeData)
    }).then(res => {
      if (res.status !== 304) {
        this.setState((prevState) => {
          let idx;
          let Recipes = prevState.Recipes;
          let id = prevState.selectedRecipe;
          Recipes.forEach(el => {
            if (el.id === id) idx = Recipes.indexOf(el);
          })
          Recipes[idx] = RecipeData;
          return {
            Recipes: Recipes,
          }
        })
      } else throw new Error('Duplicate Recipe!');
    }).catch(error => console.error('Error', error));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <hr />
          <Link to="/add"><button className="btn btn-primary btn-lg currBtnApp">Dodaj przepis</button></Link>
          <Link to="/search"><button className="btn btn-primary btn-lg currBtnApp">Wyszukaj przepis</button></Link>
          <hr />
          <div className="row justify-content-around">
            <Route exact path="/" render={() => <RecipeShort Recipes={this.state.Recipes} clickRecipe={this.onClickRecipe} />} />
            <Route path="/details" render={() => <RecipeDetails Recipes={this.state.Recipes} selectedId={this.state.selectedRecipe} endClickRecipe={this.onEndClickRecipe} deleteRecipe={this.remove} />} />
            <Route path="/add" render={() => <RecipeForm type="add" fields={{ title: ["text", "Nazwa przepisu"], url: ["text", "Adres url do zdjęcia"], description: ["text", "Dodaj opis przepisu"] }} addRecipe={this.add.bind(this)} />} />
            <Route path="/edit" render={() => <RecipeForm type="edit" fields={{ title: ["text"], url: ["text"], description: ["text"] }} Recipes={this.state.Recipes} RecipeUpdate={this.onRecipeUpdate} selectedId={this.state.selectedRecipe} endClickRecipe={this.onEndClickRecipe} />} />
            <Route path="/search" render={() => (<SearchRecipe fields={{ RecipeName: ["text"] }} clickRecipe={this.onClickRecipe} />
            )} />
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
