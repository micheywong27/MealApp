import React from 'react';
import { Link } from 'react-router-dom';

class MyPostsShowPage extends React.Component{
    
    favFilter=(recipe)=>{
        if(this.props.myFavs.includes(recipe)){
            this.props.removeFromFavs(recipe)
        }
        else {
            this.props.addToFavs(recipe)
        }
    }

    render() {
        console.log(this.props.recipe)
        // const img = this.props.nutritionInfo.image
        const favButton = this.props.myFavs.includes(this.props.recipe) ? "❤️" : "♡"

        return(
            <div className="recipe">
                {/* <img alt="recipeimg" className="recipeimg" src={img} /> */}
                <h1>{this.props.recipe.name}</h1>
                {/* <p>Ready in: {this.props.recipe.readyInMinutes} minutes</p>
                <p>Serving size: {this.props.recipe.servings}</p> */}
                <p>Ingredients: {this.props.recipe.ingredients} </p>
                <p>Instructions: {this.props.recipe.instructions}</p>
                <br />
                <button onClick={()=>{this.favFilter(this.props.recipe)}}>{favButton}</button>
                <button onClick={()=>this.props.deleteRecipe(this.props.recipe)}>Delete recipe</button>
                <Link to='/recipes'>
                <button >Go back to recipes</button>
                </Link>
            </div>
        )
    } 
}
export default MyPostsShowPage;