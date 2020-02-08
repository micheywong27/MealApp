import React from 'react';
import MyPosts from './MyPosts'
import MyFavorites from './MyFavorites'

class UserProfile extends React.Component{
    render(){ 
        return(
            <div className="profile"> 
                <h1>Michelle's Profile</h1> 
                <br /> 
                <h1>My Posts</h1> 
                {
                    this.props.myRecipes ? 
                    this.props.myRecipes.map(recipe => {
                        return <MyPosts recipe={recipe} 
                                        key={recipe.id} 
                                        nutritionInfo={this.props.nutritionInfo} 
                                        showRecipe={this.props.showRecipe} />
                    })
                    :
                    <p>You haven't posted any recipes</p> 
                }
                <h1>My Favorites</h1>
                { 
                    this.props.myFavs ? 
                    this.props.myFavs.map(recipe => { 
                        return <MyFavorites recipe={recipe} 
                                            key={recipe.id} 
                                            addToFavs={this.props.addToFavs} 
                                            removeFromFavs={this.props.removeFromFavs} 
                                            showRecipe={this.props.showRecipe} />
                    })
                    :
                    <p>You haven't favorited any recipes</p>
                }
                
            </div>
        )
    }
}
export default UserProfile;