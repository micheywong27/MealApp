import React from 'react';

class RecipeForm extends React.Component{
    render(){
        let {name, ingredients, instructions} = this.props ;
        return(
            <div className='form'>
                <h1>Tell us about your recipe!</h1>
                <form onSubmit={(e) => this.props.submitForm(e, name, ingredients, instructions)}>
                    <div> 
                        <input type='text' 
                                placeholder='Name' 
                                name="name"
                                value={name}
                                onChange={(e) => this.props.onChange(e)}/>
                        <br />
                        <input type='text' 
                                placeholder='Ingredients'
                                name="ingredients"
                                value={ingredients}
                                onChange={(e) => this.props.onChange(e)} />
                        <br />
                        <textarea type='text' 
                                    placeholder='Instructions'
                                    name="instructions"
                                    value={instructions}
                                    onChange={(e) => this.props.onChange(e)} />
                        <br />
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default RecipeForm;