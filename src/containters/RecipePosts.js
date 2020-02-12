import React from 'react';
import RecipeCard from '../components/RecipeCard'


class RecipePosts extends React.Component{
    state={
        term: ''
    }

    onChange=(e)=>{
        this.setState({
            term: e.target.value
        })
    }
    
    render(){
        return(
            <div >
                <div className="container">
                    <form onChange={() => this.props.searchResults(this.state.term)}>
                        <label className="search-label" htmlFor="search-input">
                            <input
                                type="text"
                                value={this.state.term}
                                id="search-input"
                                placeholder="Search recipes..."
                                onChange={(e) => this.onChange(e)}
                            />
                            <i className="fa fa-search search-icon"/>
                        </label>
                    </form>  
                </div>
                    
                {
                    this.props.recipes.map((recipe,indx) =>{
                        return  <RecipeCard  key={indx}
                                            recipe={recipe}
                                            fetchRecipe={this.props.fetchRecipe}
                                            />
                    })
                }
            </div>)
    }
}
export default RecipePosts;