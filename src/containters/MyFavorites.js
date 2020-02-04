import React from 'react';
import { Link } from 'react-router-dom';

class MyFavorites extends React.Component{
    render(){      
        let { recipe }= this.props;
    //WHEN YOU CLICK MY PROFILE, you have to click it twice to load the fav recipes
        return(
            <div className="mypost" onClick={() => this.props.showRecipe(recipe)} >
                 <Link to={{pathname:`/recipes/posts/${recipe.id}`,
                        recipe: recipe
                        }}
                        className='link'>  
                <h2>♦ {recipe.name}</h2>
                </Link>
            </div>
        )
    }
}
export default MyFavorites;