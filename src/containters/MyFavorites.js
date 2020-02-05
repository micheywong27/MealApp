import React from 'react';
import { Link } from 'react-router-dom';

class MyFavorites extends React.Component{
    render(){      
        let { recipe }= this.props;
    return(
            <div className="mypost" onClick={() => this.props.showRecipe(recipe)} >
                 <Link to={{pathname:`/recipes/favorite/${recipe.spoonKey}`,
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