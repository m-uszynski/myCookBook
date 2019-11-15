import React, { Component } from 'react';
import './css/App.css';
import Header from './Header'
import ReceipeShort from './ReceipeShort'
import ReceipeDetails from './ReceipeDetails'
import AddReceipe from './AddReceipe'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import axios from 'axios';
import EditReceipe from './EditReceipe';

class App extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      selectedReceipe: -1,
      receipes: null,
    }
  }

  componentDidMount() {
    this._isMounted = true;

    axios("http://localhost:8080/receipes").then(res => {
      if (this._isMounted) {
        this.setState({
          receipes: res.data
        });
      }
    }).catch(error => console.error('Error', error));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onClickReceipe = (id) => {
    this.setState({
      selectedReceipe: id
    })
  }

  onEndClickReceipe = () => {
    this.setState({
      selectedReceipe: -1
    })
  }

  add(newReceipe) {
    let id = this.state.receipes[this.state.receipes.length - 1].id + 1;

    let receipe2add = {
      id: id,
      title: newReceipe.title,
      url: newReceipe.url,
      description: newReceipe.description
    };

    axios({
      url: "http://localhost:8080/receipes",
      method: "POST",
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
      },
      data: JSON.stringify(receipe2add)
    }).then(res => {
      if (res.status !== 304) {
        let list = this.state.receipes;
        list.push(receipe2add);
        this.setState({
          receipes: list
        });
      } else throw new Error("Duplicate receipe!");
    }).catch(error => console.error('Error', error));

  }

  remove = (index) => {
    axios({
      url: "http://localhost:8080/receipes/" + index,
      method: "DELETE",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    }).then(res => {
      if (res.status !== 304) {
        let list = this.state.receipes;
        let idx;
        list.forEach(el => {
          if (el.id === index) {
            idx = list.indexOf(el);
            list.splice(idx, 1);
          }
        });
        this.setState({
          receipes: list
        })
      } else throw new Error("Receipe does not exist!");
    }).catch(error => console.error('Error', error));
  }

  onReceipeUpdate = (receipeData) => {

    axios({
      url: "http://localhost:8080/receipes",
      method: "PUT",
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
      },
      data: JSON.stringify(receipeData)
    }).then(res => {
      if (res.status !== 304) {
        this.setState((prevState) => {
          let idx;
          let receipes = prevState.receipes;
          let id = prevState.selectedReceipe;
          receipes.forEach(el => {
            if (el.id === id) idx = receipes.indexOf(el);
          })
          receipes[idx] = receipeData;
          return {
            receipes: receipes,
          }
        })
      } else throw new Error('Duplicate receipe!');
    }).catch(error => console.error('Error', error));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <hr />
          <Link to="/add"><button className="btn btn-primary btn-lg">Dodaj przepis</button></Link>
          <div className="row justify-content-around">
            <Route exact path="/" render={() => <ReceipeShort receipes={this.state.receipes} clickReceipe={this.onClickReceipe} />} />
            <Route path="/details" render={() => <ReceipeDetails receipes={this.state.receipes} selectedId={this.state.selectedReceipe} endClickReceipe={this.onEndClickReceipe} deleteReceipe={this.remove} />} />
            <Route path="/add" render={() => <AddReceipe addReceipe={this.add.bind(this)} />} />
            <Route path="/edit" render={() => <EditReceipe receipes={this.state.receipes} receipeUpdate={this.onReceipeUpdate} selectedId={this.state.selectedReceipe} endClickReceipe={this.onEndClickReceipe} />} />
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
