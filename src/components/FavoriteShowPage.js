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
        let { recipe } = this.props;
        //const favButton = this.props.myFavs.includes(recipe) ? "Saved for later ✔️" : "Save for later"
        const favButton = this.props.myFavs.includes(recipe) ? "❤️" : "♡"
        return(
            <div className="recipe">
                <img alt="recipeimg" className="recipeimg" src={recipe.url} />
                <h1>{recipe.name}</h1>
                <p>Ready in: {recipe.cookTime} minutes</p>
                <p>Serving size: {recipe.servingSize}</p>
                <p>Ingredients: {recipe.ingredients} </p>
                <p>Instructions: {recipe.instructions}</p>
                <br />
                <button onClick={()=>{this.favFilter(recipe, this.props.nutritionInfo)}}>{favButton}</button>
                <Link to='/calendar' className='link'>
                <button onClick={() => {this.props.addRecipeToCalendar(recipe.name, recipe)}} >Add recipe to your calendar</button>
                </Link>
                <Link to='/profile'>
                <button>Go back to profile</button>
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