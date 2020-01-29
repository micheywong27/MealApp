import React from 'react';

class RecipeForm extends React.Component{
    render(){
        return(
            <div className='form'>
                <h1>Tell us about your recipe!</h1>
                <form>
                    <div> 
                        <input type='text' placeholder='Name' />
                        <br />
                        <input type='text' placeholder='Ingredients' />
                        <br />
                        <textarea type='text' placeholder='Instructions' />
                        <br />
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default RecipeForm;