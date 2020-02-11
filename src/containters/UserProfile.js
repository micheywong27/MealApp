import GroceryItem from '../components/GroceryItem';
import GroceryListUpdate from '../components/GroceryListUpdate';
import { Link } from 'react-router-dom';
import MyPosts from './MyPosts';
import MyFavorites from './MyFavorites';
import React from 'react';

const OPTIONS = ["One", "Two", "Three"];

class UserProfile extends React.Component{
    state = {
        checkboxes: this.props.existingEntries.reduce(
            (options, option) => ({
              ...options,
              [option]: false
            }),
            {}
          ),
        updateList: false
    }

    updateGroceryList=()=>{
        this.setState({
            updateList: !this.state.updateList
        })
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
        <GroceryListUpdate
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={option}
        />
      );

    createCheckboxes = () => this.props.existingEntries.map(this.createCheckbox);

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
                <h1>Grocery List</h1>
                <button onClick={this.updateGroceryList}>Update grocery list</button>
                {this.state.updateList ? 
                    (<form onSubmit={this.handleFormSubmit}>
                        {this.createCheckboxes()}

                        <div className="form-group mt-2">
                            <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.selectAll}
                            >
                            Select All
                            </button>
                            <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.deselectAll}
                            >
                            Deselect All
                            </button>
                            <button type="submit" className="btn btn-primary"
                                    onClick={this.updateGroceryList}>
                            Save
                            </button>
                        </div>
                    </form>)
                :
                    
                        this.props.existingEntries ? 
                        (       
                            this.props.existingEntries.map(item => {
                                return <GroceryItem item={item}  key={item.id}/>
                                })
                        )
                        :
                        <p>You have no items in your grocery list</p>
                    
                }

            </div>
        )
    }
}
export default UserProfile;