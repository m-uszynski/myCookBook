import React, { Component } from 'react';
import './css/ReceipeDetails.css';
import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';

class ReceipeDetails extends Component {
    // state = {  }
    render() {
        if (this.props.selectedId > 0) {
            return (
                this.props.receipes.map(receipe => {
                    if (receipe.id === this.props.selectedId) {
                        return (
                            <div className="col-sm-12 receipe" key={receipe.id}>
                                <div className="title">
                                    {receipe.title}
                                </div>
                                <div className="imageDetails">
                                    <img src={receipe.url} alt={receipe.title} />
                                </div>
                                <div className="description">
                                    {receipe.description}
                                </div>
                                <p>
                                    <Link to="/"><button className="btnAdd btn btn-primary" onClick={this.props.endClickReceipe}>Powrót</button></Link>
                                    <Link to="/"><button className="btnAdd btn btn-danger" onClick={() => this.props.deleteReceipe(this.props.selectedId)}>Usuń</button></Link>
                                </p>
                            </div>
                        );
                    }
                    else return false;
                })
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

export default ReceipeDetails;