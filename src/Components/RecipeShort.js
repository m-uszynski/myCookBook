import React from 'react';
import './css/RecipeShort.css';
import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeShort = (props) => {

    if (props.Recipes !== null) {
        return (
            props.Recipes.map(Recipe => {
                return (
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 Recipe align-self-baseline" key={Recipe.id}>
                        <div className="title">
                            {Recipe.title}
                        </div>
                        <div className="image">
                            <img src={Recipe.url} alt={Recipe.title.slice(0, 10)} />
                        </div>
                        <div className="shortDesc">
                            {Recipe.description.slice(0, 100)}...
                        </div>
                        <Link to="/details"><button className="btn btn-success" onClick={() => props.clickRecipe(Recipe.id)}>Zobacz</button></Link>
                    </div>
                );
            })
        );
    }

    return (
        <p>Brak przepisów!</p>
    )
}
RecipeShort.propTypes={
    Recipes: PropTypes.arrayOf(PropTypes.object),
    clickRecipe: PropTypes.func
}

export default RecipeShort;