import React from 'react';
import { Link } from 'react-router-dom';

class MyPosts extends React.Component{
    render(){
        let { recipe }= this.props;
        return(
            //onClick go to recipe show page
            <div className="mypost" onClick={() => this.props.showRecipe(recipe)} >
                 <Link to={{pathname:`/recipes/myposts/${recipe.id}`,
                        recipe: recipe
                        }}
                        className='link'>  
                <h2>♦ {recipe.name}</h2>
                </Link>
            </div>
        )
    }
}
export default MyPosts;