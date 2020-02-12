import GroceryItem from '../components/GroceryItem';
import Checkbox from '../components/Checkbox';
import MyPosts from './MyPosts';
import MyFavorites from './MyFavorites';
import React from 'react';

class UserProfile extends React.Component{
    state = {
        checkboxes: this.props.existingEntries.reduce(
            (options, option) => ({
                    ...options,
                    [option]: false
                    }),
                {}
            ),
        updateList: false,
        uncheckedItems:[]
    }

    updateGroceryList=()=>{
        this.setState({
            updateList: !this.state.updateList
        })
        this.saveUncheckedItems()
    }

    selectAllCheckboxes = isSelected => {
        Object.keys(this.state.checkboxes).forEach(checkbox => {
          // BONUS: Can you explain why we pass updater function to setState instead of an object?
          this.setState(prevState => ({
            checkboxes: {
              ...prevState.checkboxes,
              [checkbox]: isSelected
            }
          }));
        });
      };
    
      selectAll = () => this.selectAllCheckboxes(true);
    
      deselectAll = () => this.selectAllCheckboxes(false);
    
      handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;
    
        this.setState(prevState => ({
          checkboxes: {
            ...prevState.checkboxes,
            [name]: !prevState.checkboxes[name]
          }
        }));
      };
    
      handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    
        Object.keys(this.state.checkboxes)
          .filter(checkbox => this.state.checkboxes[checkbox])
          .forEach(checkbox => {
            console.log(checkbox, "is selected.");
          });
      };
    
    createCheckbox = (option) => (
        <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={option}
        />
      );

    createCheckboxes = () => this.props.existingEntries.map(this.createCheckbox);
    
    saveUncheckedItems=()=>{
        const uncheckedItems = Object.keys(this.state.checkboxes)
        .filter(key => this.state.checkboxes[key] === false)

        this.props.resetGroceryItems(uncheckedItems)
    }

    render(){ 
        return(
            <div className="profile"> 
                <h1>{this.props.username}'s Profile</h1> 
                <br /> 
                <h1 className="profile-header">My Posts</h1> 
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
                <h1 className="profile-header">My Favorites</h1>
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
                {this.state.updateList ? 
                    (<div className="grocery-list"> 
                        <h1>Grocery List</h1>
                        <button onClick={this.updateGroceryList}>Update grocery list</button>
                        <form onSubmit={this.handleFormSubmit}>
                        {this.createCheckboxes()}
                            <div className="form-group mt-2">
                                <button type="button" onClick={this.props.addGroceryItem}> Add item to grocery list </button>
                                <button type="button" onClick={this.selectAll} > Select All </button>
                                <button type="button" onClick={this.deselectAll}> Deselect All </button>
                                <button type="submit" onClick={this.updateGroceryList}> Save </button>
                            </div>
                        </form>
                    </div> )
                :
                    (this.props.existingEntries ? 
                        <div className="grocery-list"> 
                            <h1>Grocery List</h1>
                            <button onClick={this.updateGroceryList}>Update grocery list</button>
                            { this.props.existingEntries.map((item,indx) => {
                                return <GroceryItem item={item}  
                                                    key={indx} />
                                })
                            }
                        </div>
                    :
                        <p>You have no items in your grocery list</p>)
                }
            </div>
        )
    }
}
export default UserProfile;