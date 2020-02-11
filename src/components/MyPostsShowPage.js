import React from 'react';
import { Link } from 'react-router-dom';
import DeleteSuccessMessage from './DeleteSuccessMessage'
class MyPostsShowPage extends React.Component{
    render() {
        let { recipe } = this.props;
        const deleteButton = this.props.isDeleted ? "❌" : "Delete recipe"
        
        return(
            <div className="recipe">
                <img alt="recipeimg" className="recipeimg" src={recipe.url} />
                <h1>{recipe.name}</h1>
                <p>Ready in: {recipe.cookTime} minutes</p>
                <p>Serving size: {recipe.servingSize}</p>
                <p>Ingredients: {recipe.ingredients} </p>
                <p>Instructions: {recipe.instructions}</p>
                <button onClick={()=>this.props.deleteRecipe(recipe)}>{deleteButton}</button>
                <Link to='/calendar' className='link'>
                {!this.props.isDeleted && 
                <button onClick={() => {this.props.addRecipeToCalendar(recipe.name, recipe)}}>Add recipe to your calendar</button>
                }
                </Link>
                <Link to='/profile' >
                <button onClick={() => this.props.isDeletedRefresh()}>Go back to your profile</button>
                </Link>
                <br />
                <a href="/#" className="previous round">&#8249;</a>
                <a href="/#" className="next round">&#8250;</a>
                <br/>
                {this.props.isDeleted && <DeleteSuccessMessage />}
            </div>
        )
    } 
}
export default MyPostsShowPage;