import React from 'react';
import { Link } from 'react-router-dom';

class FavoriteShowPage extends React.Component{
    favFilter=(recipe, nutritionInfo)=>{
        if(this.props.myFavs.includes(recipe)){
            this.props.removeFromFavs(recipe)
        }
        else {
            this.props.addToFavs(recipe, nutritionInfo)
        }
    }

    render() {
        const favButton = this.props.myFavs.includes(this.props.recipe) ? "❤️" : "♡"
        return(
            <div className="recipe">
                <img alt="recipeimg" className="recipeimg" src={this.props.recipe.url} />
                <h1>{this.props.recipe.name}</h1>
                <p>Ready in: {this.props.recipe.cookTime} minutes</p>
                <p>Serving size: {this.props.recipe.servingSize}</p>
                <p>Ingredients: {this.props.recipe.ingredients} </p>
                <p>Instructions: {this.props.recipe.instructions}</p>
                <br />
                <button onClick={()=>{this.favFilter(this.props.recipe, this.props.nutritionInfo)}}>{favButton}</button>
                <Link to='/recipes'>
                <button>Go back to recipes</button>
                </Link>
                <br />
                <a href="/#" className="previous round">&#8249;</a>
                <a href="/#" className="next round">&#8250;</a>
                <br/>
            </div>
        )
    } 
}
export default FavoriteShowPage;