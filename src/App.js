import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RecipePosts from './containters/RecipePosts';
import UserProfile from './containters/UserProfile';
import RecipeForm from './components/RecipeForm';
import ScheduleMeal from './components/ScheduleMeal';
import RecipeShowPage from './components/RecipeShowPage';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    recipes: [],
    searchTerm: '',
    nutritionInfo: [],
    recipe : [],
    myFavs: []
  }

  componentDidMount(){
    var key = process.env.REACT_APP_API_KEY;
    var term= this.state.searchTerm
    var url = `https://api.spoonacular.com/recipes/search?query=${term}&apiKey=${key}`
    fetch(`${url}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        recipes: data.results
      })
    })
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
  }

  //GET fetch to recieve nutrition info on specific recipe I click on
  fetchRecipe=(recipe)=>{
    var key = process.env.REACT_APP_API_KEY;
    var id = recipe.id
    var recipeURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${key}`
    fetch(`${recipeURL}`)
    .then(resp => resp.json())
    .then(data =>{
      this.setState({ 
        recipe: recipe,
        nutritionInfo: data
      })
    })
  }

  //search bar input will GET fetch to show results based on the search term
  searchResults=(term)=>{
    this.setState({
      searchTerm: term
    })
    var key = process.env.REACT_APP_API_KEY;
    var term= this.state.searchTerm
    var url = `https://api.spoonacular.com/recipes/search?query=${term}&apiKey=${key}`
    fetch(`${url}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        recipes: data.results
      })
    })
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
  }

  addToFavs=(recipe)=>{
    console.log("adding to favs")
    if(!this.state.myFavs.includes(recipe)){
      this.setState({
        myFavs: [...this.state.myFavs, recipe]
      })
    }
  }

  removeFromFavs=(recipe)=>{
    console.log("removing from favs")
    const updatedFavs = this.state.myFavs.filter(fav => {
        return fav !== recipe
    })
    this.setState({
      myFavs: updatedFavs
    })
  }

  //on form submit, POST fetch
  // tcp://127.0.0.1:3000

  render(){ 
    return (
      <div className="App">
        <Navbar />
        <Switch> 

          <Route path='/recipes/:id' render={() => <RecipeShowPage recipe={this.state.recipe}
                                                            nutritionInfo={this.state.nutritionInfo}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myFavs={this.state.myFavs}
                                                            /> } />
          <Route path='/recipes' render={() => <RecipePosts recipes={this.state.recipes}
                                                            searchResults={this.searchResults}
                                                            fetchRecipe={this.fetchRecipe} 
                                                            />}  />
          <Route path='/profile' render={() => <UserProfile myFavs={this.state.myFavs}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            /> } />
          <Route path='/form' render={() => <RecipeForm /> } />
          <Route path='/calendar' render={() => <ScheduleMeal /> } />
        </Switch>
      </div>
    );
  }
}
export default App;
