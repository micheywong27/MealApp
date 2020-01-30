import React from 'react';
import { Link } from 'react-router-dom';

class RecipeShowPage extends React.Component{
    
    favFilter=(recipe)=>{
        if(this.props.myFavs.includes(recipe)){
            this.props.removeFromFavs(recipe)
        }
        else {
            this.props.addToFavs(recipe)
        }
    }

    render() {
        const img = this.props.nutritionInfo.image
        const favButton = this.props.myFavs.includes(this.props.recipe) ? "❤️" : "♡"

        return(
            <div className="recipe">
                <img alt="recipeimg" className="recipeimg" src={img} />
                <h1>{this.props.recipe.title}</h1>
                <p>Ready in: {this.props.recipe.readyInMinutes} minutes</p>
                <p>Serving size: {this.props.recipe.servings}</p>
                <p>{this.props.nutritionInfo.instructions}</p>
                <p>Ingredients: </p>
                {this.props.nutritionInfo.extendedIngredients ? 
                    this.props.nutritionInfo.extendedIngredients.map(ingredient =>{
                        return '•' + ingredient.name + ' '
                    })
                :
                    <h1>No ingredients</h1>
                }
                <br />
                <button onClick={()=>{this.favFilter(this.props.recipe)}}>{favButton}</button>
                <Link to='/recipes'>
                <button >Go back to recipes</button>
                </Link>
                <br/>
                <a href="#" class="previous round">&#8249;</a>
                <a href="#" class="next round">&#8250;</a>
            </div>
        )
    } 
}
export default RecipeShowPage;