import React from 'react';
import './App.css';
import FavoriteShowPage from './components/FavoriteShowPage';
import Login from './components/Login'
import MyPostsShowPage from './components/MyPostsShowPage';
import Navbar from './components/Navbar';
import RecipePosts from './containters/RecipePosts';
import RecipeForm from './components/RecipeForm';
import RecipeShowPage from './components/RecipeShowPage';
import ScheduleMeal from './components/ScheduleMeal';
import UserProfile from './containters/UserProfile';
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
    showMyRecipe: [],
    cookTime: '',
    servingSize: '',
    isSubmitted: false
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

  addToFavs=(recipe, nutritionInfo)=>{
  const id = nutritionInfo.id
    const url = nutritionInfo.image
    const name = nutritionInfo.title
    const ingredients = nutritionInfo.extendedIngredients.map(ingredient => {
      return ingredient.name
    })
    const myingredients = ingredients.join(" ")
    const instructions = nutritionInfo.instructions
    const cookTime = nutritionInfo.cookingMinutes
    const servingSize = nutritionInfo.servings 

      this.setState({
        myFavs: [...this.state.myFavs, recipe]
      })
    
      fetch('http://127.0.0.1:3000/recipe_posts', {
          method: 'POST',
          headers:{ 'Content-Type': 'application/json',
                    'Accept': 'application/json'},
          body: JSON.stringify({
            url: url,
            name: name, 
            ingredients: myingredients, 
            instructions: instructions,
            cookTime: cookTime,
            servingSize: servingSize,
            spoonKey: id
        })
      })
    .then(resp => resp.json())
    .then((recipe) => {
      this.setState({
        url: '',
        name: '',
        ingredients: '',
        instructions: '',
        cookTime: '',
        servingSize: '',
        isSubmitted: true
      })
      this.postToFavs(recipe)
    })
    
  }
  
  postToFavs=(recipe)=>{
    const newId = recipe.id
    fetch('http://127.0.0.1:3000/favorites', {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json',
                  'Accept': 'application/json'},
        body: JSON.stringify({
          postId: newId
        })
      })
    .then(resp => resp.json())
  }

  //everytime you click my profile, it will fetch the current list of my recipes/ my favs
  getMyRecipes=()=>{
    fetch(`http://127.0.0.1:3000/recipe_posts`)
    .then(resp => resp.json())
    .then(myrecipes => {
      const filteredRecipes = myrecipes.filter(recipe =>{
        return !recipe.spoonKey
      })
      this.setState({
          myRecipes: filteredRecipes
        }
      )
      this.getMyFavs(myrecipes)
    })
  }

  getMyFavs=(myrecipes)=>{
    const theFavs = myrecipes.filter(recipe => {
      return !!recipe.spoonKey
    })
    this.setState({
      myFavs: theFavs
    })
   }

  removeFromFavs=(recipe)=>{
    console.log("removing from favs")
    const updatedFavs = this.state.myFavs.filter(fav => {
        return fav !== recipe
    })
    this.setState({
      myFavs: updatedFavs
    })
    const id = recipe.id
    fetch(`http://127.0.0.1:3000/recipe_posts/${id}`,{
      method: 'delete'
    })
    .then(() => {console.log("recipe removed")})
    .catch(err => {
      console.error(err)
    })
  }

  onChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  submitForm=(e, url, name, ingredients, instructions, cookTime, servingSize)=>{
    e.preventDefault()
    fetch('http://127.0.0.1:3000/recipe_posts', {
          method: 'POST',
          headers:{ 'Content-Type': 'application/json',
                    'Accept': 'application/json'},
          body: JSON.stringify({
            url: url,
            name: name, 
            ingredients: ingredients, 
            instructions: instructions,
            cookTime: cookTime,
            servingSize: servingSize
        })
      })
    .then(resp => resp.json())
    .then( () => {
      this.setState({
        url: '',
        name: '',
        ingredients: '',
        instructions: '',
        cookTime: '',
        servingSize: '',
        isSubmitted: true
      })
    })
  }

  resetIsSubmitted=()=>{
    this.setState({
      isSubmitted: false
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
    return (
      <div className="App">
        <Navbar getMyRecipes={this.getMyRecipes}
                isSubmitted={this.state.isSubmitted}
                resetIsSubmitted={this.resetIsSubmitted}
                />
        <Switch> 
          <Route path='/recipes/favorite/:id' render={() => <FavoriteShowPage recipe={this.state.showMyRecipe}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myFavs={this.state.myFavs}
                                                            deleteRecipe={this.deleteRecipe}
                                                            /> } />
          <Route path='/recipes/posts/:id' render={() => <MyPostsShowPage recipe={this.state.showMyRecipe}
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
                                                        cookTime={this.state.cookTime}
                                                        servingSize={this.state.servingSize}
                                                        onChange={this.onChange}
                                                        isSubmitted={this.state.isSubmitted}
                                                        /> } />
          <Route path='/calendar' render={() => <ScheduleMeal /> } />
          <Route exact path='/' render={() => <Login /> } />  
        </Switch>
      </div>
    );
  }
}
export default App;
