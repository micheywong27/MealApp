import React from 'react';
import './App.css';
import FavoriteShowPage from './components/FavoriteShowPage';
import GroceryListUpdate from './components/GroceryListUpdate'
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
    isSubmitted: false,
    isDeleted: false,
    startTime: '',
    endTime: '',
    recipeInputName: '',
    events: [],
    recipePostId: '',
    showPopup: false
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
    this.resetIsSubmitted()
    this.getMyRecipes()
    this.getEvents()
  }

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
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
  }

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
    .catch(error => {
      console.log('Error fetching & parsing data', error);
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
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
  }

  getMyRecipes=()=>{
    fetch(`http://127.0.0.1:3000/recipe_posts`)
    .then(resp => resp.json())
    .then(myrecipes => {
      const filteredRecipes = myrecipes.filter(recipe =>{
        return !recipe.spoonKey
      })
      this.setState({
          myRecipes: filteredRecipes,
          isDeleted: false
        }
      )
      this.getMyFavs(myrecipes)
    })
    .catch(error => {
      console.log('Error fetching & parsing data', error);
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
    .catch(error => {
      console.log('Error fetching & parsing data', error);
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
    .then((recipe) => {
      this.setState({
        myRecipes: [...this.state.myRecipes,recipe]
      })
    })
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
    this.setState({
      url: '',
      name: '',
      ingredients: '',
      instructions: '',
      cookTime: '',
      servingSize: '',
      isSubmitted: true
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
    .then(() => {
      const updatedRecipes = this.state.myRecipes.filter(r => {
        return r !== recipe 
      })
      this.setState({
        isDeleted: true,
        myRecipes: updatedRecipes     
      })
    })
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
  }

  isDeletedRefresh=()=>{
    console.log("resentting isDeleted")
    this.setState({
      isDeleted: false
    })
  }

  addEvent = () => {
    const recipeName = this.state.recipeInputName
    const startTime = this.state.startTime
    const endTime = this.state.endTime
    const postId = this.state.recipePostId
    fetch('http://127.0.0.1:3000/create_events', {
          method: 'POST',
          headers:{ 'Content-Type': 'application/json',
                    'Accept': 'application/json'},
          body: JSON.stringify({
            title: recipeName,
            allDay: false,
            start: startTime,
            end: endTime,
            postId: postId
        })
      })
    .then(resp => resp.json())
    .then(() => {
      this.setState({
        showPopup: false
      })
    })
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
  }

  resetShowPopup=(event)=>{
    this.setState({
      showPopup: !this.state.showPopup,
      recipeInputName: event.title
    })
  }

  setInputValue = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  getEvents=()=>{
    fetch('http://127.0.0.1:3000/create_events')
    .then(resp => resp.json())
    .then(events =>{
      this.setState({
        events: events,
        recipeInputName: ''
      })
    })
    .catch(error => {
      console.log('Error fetching & parsing data', error);
    })
  }

  addRecipeToCalendar=(recipeName, recipe)=>{
    this.setState({
      recipeInputName: recipeName,
      recipePostId: recipe.id
    })
  }

  addGroceryItem=()=>{
    var existingEntries = JSON.parse(localStorage.getItem("groceryItems"));
    var newItem = prompt("Add a grocery item");
    if(existingEntries == null) existingEntries = []; 
    localStorage.setItem("newItem", JSON.stringify(newItem));
    // Save groceryItems back to local storage
    existingEntries.push(newItem);
    localStorage.setItem("groceryItems", JSON.stringify(existingEntries));
  }

  

  render(){ 
    var existingEntries = JSON.parse(localStorage.getItem("groceryItems"));
    console.log(existingEntries)
    return (
      <div className="App">
        <Navbar getMyRecipes={this.getMyRecipes}
                isSubmitted={this.state.isSubmitted}
                resetIsSubmitted={this.resetIsSubmitted}
                getEvents={this.getEvents}
                />
        <Switch> 
          <Route path='/recipes/favorite/:id' render={() => <FavoriteShowPage recipe={this.state.showMyRecipe}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myFavs={this.state.myFavs}
                                                            deleteRecipe={this.deleteRecipe}
                                                            addRecipeToCalendar={this.addRecipeToCalendar}/> } />
          <Route path='/recipes/posts/:id' render={() => <MyPostsShowPage recipe={this.state.showMyRecipe}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myFavs={this.state.myFavs}
                                                            deleteRecipe={this.deleteRecipe}
                                                            addRecipeToCalendar={this.addRecipeToCalendar}
                                                            isDeleted={this.state.isDeleted}
                                                            isDeletedRefresh = {this.isDeletedRefresh}
                                                            /> } />
          <Route path='/recipes/:id' render={() => <RecipeShowPage recipe={this.state.recipe}
                                                            nutritionInfo={this.state.nutritionInfo}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myFavs={this.state.myFavs}
                                                            addRecipeToCalendar={this.addRecipeToCalendar}
                                                            addGroceryItem={this.addGroceryItem}
                                                            /> } />
          <Route path='/recipes' render={() => <RecipePosts recipes={this.state.recipes}
                                                            searchResults={this.searchResults}
                                                            fetchRecipe={this.fetchRecipe} />}  />
          <Route path='/profile' render={() => <UserProfile myFavs={this.state.myFavs}
                                                            nutritionInfo={this.state.nutritionInfo}
                                                            addToFavs={this.addToFavs}
                                                            removeFromFavs={this.removeFromFavs}
                                                            myRecipes={this.state.myRecipes}
                                                            showRecipe={this.showRecipe}
                                                            addRecipeToCalendar={this.addRecipeToCalendar}
                                                            existingEntries={existingEntries}
                                                            createCheckboxes={this.createCheckboxes}
                                                            /> } />    
          <Route path='/grocerylist/update' render={() => <GroceryListUpdate existingEntries={existingEntries}/> } />                                                                                              
          <Route path='/form' render={() => <RecipeForm submitForm={this.submitForm}
                                                        url={this.state.url}
                                                        name={this.state.name}
                                                        ingredients={this.state.ingredients}
                                                        instructions={this.state.instructions}
                                                        cookTime={this.state.cookTime}
                                                        servingSize={this.state.servingSize}
                                                        onChange={this.onChange}
                                                        isSubmitted={this.state.isSubmitted}/> } />
          <Route path='/calendar' render={() => <ScheduleMeal addEvent={this.addEvent}
                                                setInputValue={this.setInputValue}
                                                startTime={this.state.startTime}
                                                endTime = {this.state.endTime}
                                                recipeInputName={this.state.recipeInputName}
                                                getEvents={this.getEvents}
                                                events={this.state.events}
                                                autoFillEvent={this.autoFillEvent}
                                                resetShowPopup={this.resetShowPopup}
                                                showPopup={this.state.showPopup}
                                                /> } 
                                                />
          <Route exact path='/' render={() => <Login /> } />  
        </Switch>
      </div>
    );
  }
}
export default App;
