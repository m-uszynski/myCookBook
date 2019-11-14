import React, { Component } from 'react';
import './css/ReceipeShort.css';
import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';
class ReceipeShort extends Component {
    // state = {  }
    render() {
        if (this.props.receipes !== null) {
            return (
                this.props.receipes.map(receipe => {
                    return (
                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 receipe align-self-baseline" key={receipe.id}>
                            <div className="title">
                                {receipe.title}
                            </div>
                            <div className="image">
                                <img src={receipe.url} alt='photo' />
                            </div>
                            <div className="shortDesc">
                                {receipe.description.slice(0, 100)}...
                            </div>
                            <Link to="/details"><button className="btn btn-success" onClick={() => this.props.clickReceipe(receipe.id)}>Zobacz</button></Link>
                        </div>
                    );
                })
            );
        }

        return (
            <p>Brak przepisów!</p>
        )
    }
}

export default ReceipeShort;