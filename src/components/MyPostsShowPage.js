import React from 'react';
import { Link } from 'react-router-dom';

class MyPostsShowPage extends React.Component{
    render() {
        let { recipe } = this.props;
        console.log(recipe)
        return(
            <div className="recipe">
                <img alt="recipeimg" className="recipeimg" src={recipe.url} />
                <h1>{recipe.name}</h1>
                <p>Ready in: {recipe.cookTime} minutes</p>
                <p>Serving size: {recipe.servingSize}</p>
                <p>Ingredients: {recipe.ingredients} </p>
                <p>Instructions: {recipe.instructions}</p>
                <button onClick={()=>this.props.deleteRecipe(recipe)}> Delete recipe </button>
                <Link to='/calendar' className='link'>
                <button onClick={() => {this.props.addRecipeToCalendar(recipe.name)}} >Add recipe to your calendar</button>
                </Link>
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
export default MyPostsShowPage;