import React from 'react';
import { Link } from 'react-router-dom';

class MyFavorites extends React.Component{
    render(){
        console.log(this.props.recipe)
        let { recipe }= this.props;
        return(
            //onClick go to recipe show page
            <div className="mypost" onClick={() => this.props.showRecipe(recipe)} >
                 <Link to={{pathname:`/recipes/${recipe.id}`,
                        recipe: recipe
                        }}
                        className='link'>  
                <h2>♦ {recipe.title}</h2>
                </Link>
            </div>
        )
    }
}
export default MyFavorites;