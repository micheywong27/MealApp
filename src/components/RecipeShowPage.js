import React from 'react';
import { Link } from 'react-router-dom';

class RecipeShowPage extends React.Component{
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
        const img = this.props.nutritionInfo.image
        const favButton = this.props.myFavs.includes(recipe) ? "❤️" : "♡"
        return(
            <div className="recipe">
                <img alt="recipeimg" className="recipeimg" src={img} />
                <h1>{recipe.title}</h1>
                <p>Ready in: {recipe.readyInMinutes} minutes</p>
                <p>Serving size: {recipe.servings}</p>
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
                <button onClick={()=>{this.favFilter(recipe, this.props.nutritionInfo)}}>{favButton}</button>
                <Link to='/calendar' className='link'>
                <button onClick={() => {this.props.addRecipeToCalendar(recipe.title)}} >Add recipe to your calendar</button>
                </Link>
                <Link to='/recipes'>
                <button >Go back to recipes</button>
                </Link>
                <br/>
                <a href="/#" className="previous round">&#8249;</a>
                <a href="/#" className="next round">&#8250;</a>
            </div>
        )
    } 
}
export default RecipeShowPage;