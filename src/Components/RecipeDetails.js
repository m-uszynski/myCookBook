import React from 'react';
import './css/RecipeDetails.css';
import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types';


const RecipeDetails = (props) => {
    if (props.selectedId > 0) {
        return (
            props.Recipes.map(Recipe => {
                if (Recipe.id === props.selectedId) {
                    return (<div key={Recipe.id}>
                        <div className="col-sm-12 Recipe row">

                            <div className="col-sm-12 col-md-9">
                                <div className="title">
                                    {Recipe.title}
                                </div>
                                <div className="imageDetails">
                                    <img src={Recipe.url} alt={Recipe.title} />
                                </div>
                                <div className="description">
                                    {Recipe.description}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-3">
                                <div className="titleList">
                                    Lista zakupów
                                </div>
                                <ul>
                                    {Recipe.ingredients.map((el, index) => {
                                        return <li className="list" key={el.name + el.amount}>
                                            {el.name + " " + el.amount}
                                        </li>
                                    })}
                                </ul>
                            </div>

                            <div className="col-12 nonexist">
                                <Link to="/"><button className="btnAdd btn btn-primary" onClick={props.endClickRecipe}>Powrót</button></Link>
                                <Link to="/edit"><button className="btnAdd btn btn-primary">Edytuj</button></Link>
                                <Link to="/"><button className="btnAdd btn btn-danger" onClick={() => props.deleteRecipe(props.selectedId)}>Usuń</button></Link>
                            </div>

                        </div>
                    </div>
                    );
                }
                else return false;
            })
        );
    }

    return (
        <div className="col-sm-12 Recipe">
            <p className="nonexist">Nie znaleziono takiego przepisu!</p>
            <Link to="/"><button className="btn btn-primary" onClick={props.endClickRecipe}>Powrót</button></Link>
        </div>
    )
}

RecipeDetails.propTypes={
    Recipes: PropTypes.arrayOf(PropTypes.object),
    selectedId: PropTypes.number,
    endClickRecipe: PropTypes.func,
    deleteRecipe:PropTypes.func
}
export default RecipeDetails;