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
        const inputUrl = this.props.recipe.url
        const url = inputUrl.toString()
        return(
            <div className="recipe">
                <img alt="recipeimg" className="recipeimg" src={url} />
                <h1>{this.props.recipe.name}</h1>
                <p>Ready in: {this.props.recipe.cookTime} minutes</p>
                <p>Serving size: {this.props.recipe.servingSize}</p>
                <p>Ingredients: {this.props.recipe.ingredients} </p>
                <p>Instructions: {this.props.recipe.instructions}</p>
                <button onClick={()=>this.props.deleteRecipe(this.props.recipe)}> Delete recipe </button>
                <Link to='/recipes'>
                <button>Go back to recipes</button>
                </Link>
                <br />
                <a href="#" className="previous round">&#8249;</a>
                <a href="#" className="next round">&#8250;</a>
                <br/>
            </div>
        )
    } 
}
export default MyPostsShowPage;