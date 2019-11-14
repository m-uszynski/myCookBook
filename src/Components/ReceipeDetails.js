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
                                <Link to="/"><button className="btn btn-success" onClick={this.props.endClickReceipe}>Powrót</button></Link>
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
                <Link to="/"><button onClick={this.props.endClickReceipe}>Powrót</button></Link>
            </div>
        )
    }
}

export default ReceipeDetails;