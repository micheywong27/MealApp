import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RecipePosts from './containters/RecipePosts';
import UserProfile from './containters/UserProfile';
import RecipeForm from './components/RecipeForm';
import ScheduleMeal from './components/ScheduleMeal';
import RecipeShowPage from './components/RecipeShowPage';
import MyPostsShowPage from './components/MyPostsShowPage';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    recipes: [],
    myRecipes: [],
    searchTerm: '',
    nutritionInfo: [],
    recipe : [],
    myFavs: [],
    url: '',
    name: '',
    ingredients: '',
    instructions: '',
    showMyRecipe: []
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
  searchResults=(searched)=>{
    this.setState({
      searchTerm: searched
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

  onChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  submitForm=(e, url, name,ingredients,instructions)=>{
    e.preventDefault()
    fetch('http://127.0.0.1:3000/recipe_posts', {
          method: 'POST',
          headers:{ 'Content-Type': 'application/json',
                    'Accept': 'application/json'},
          body: JSON.stringify({
            userId: 1,
            url: url,
            name: name, 
            ingredients: ingredients, 
            instructions: instructions
        })
      })
    .then(resp => resp.json())
    .then( () => {
      this.setState({
        url: '',
        name: '',
        ingredients: '',
        instructions: ''
      })
    })
  }

  //everytime you click my profile, it will fetch the current list of my recipes
  getMyRecipes=()=>{
    fetch(`http://127.0.0.1:3000/recipe_posts`)
    .then(resp => resp.json())
    .then(myrecipes => {
        this.setState({
          myRecipes: myrecipes
        })
    })
    }

    showRecipe=(recipe)=>{
      this.setState({
        showMyRecipe: recipe
      })
    }

    deleteRecipe=(recipe)=>{
      const id = recipe.id
      fetch(`http://127.0.0.1:3000/recipe_posts/${id}`,{
        method: 'delete'
      })
      .then(() => {console.log("recipe removed")})
      .catch(err => {
        console.error(err)
      })
    }

  render(){ 
    console.log(this.state.url)
    return (
      <div className="App">
        <Navbar getMyRecipes={this.getMyRecipes}/>
        <Switch> 
          <Route path='/recipes/myposts/:id' render={() => <MyPostsShowPage recipe={this.state.showMyRecipe}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myFavs={this.state.myFavs}
                                                            deleteRecipe={this.deleteRecipe}
                                                            /> } />
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
                                                            nutritionInfo={this.state.nutritionInfo}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myRecipes={this.state.myRecipes}
                                                            showRecipe={this.showRecipe}
                                                            /> } />
          <Route path='/form' render={() => <RecipeForm submitForm={this.submitForm}
                                                        url={this.state.url}
                                                        name={this.state.name}
                                                        ingredients={this.state.ingredients}
                                                        instructions={this.state.instructions}
                                                        onChange={this.onChange}
                                                        /> } />
          <Route path='/calendar' render={() => <ScheduleMeal /> } />
        </Switch>
      </div>
    );
  }
}
export default App;
