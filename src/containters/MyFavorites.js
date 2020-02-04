import React from 'react';
import { Link } from 'react-router-dom';

class MyFavorites extends React.Component{
    render(){      
        let { recipe }= this.props;
    //WHEN YOU CLICK MY PROFILE, you have to click it twice to load the fav recipes
       
    //can either send to fav show page through => my posts show page or recipe show page
        //my posts show page takes in same attributes (this.props.recipe.name) BUT no fav button only delete option
        //recipe show page doesnt take in the same attributes (takes in this.props.nutritionInfo)
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