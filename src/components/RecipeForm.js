import React from 'react';

class RecipeForm extends React.Component{
    render(){
        let {url, name, ingredients, instructions, cookTime, servingSize} = this.props ;
        return(
            <div className='form'>
                <h1>Tell us about your recipe!</h1>
                <form onSubmit={(e) => this.props.submitForm(e, url, name, ingredients, instructions, cookTime, servingSize)}>
                    <div> 
                        <input type="text" 
                                name="url"
                                placeholder="Insert image URL" 
                                value={url} 
                                onChange={e =>this.props.onChange(e)}/>
                        <br />
                        <input type='text' 
                                    placeholder='Name'
                                    name="name"
                                    value={name}
                                    onChange={(e) => this.props.onChange(e)} />
                        <br />
                        <input type='text' 
                                    placeholder='Cook time'
                                    name="cookTime"
                                    value={cookTime}
                                    onChange={(e) => this.props.onChange(e)} />
                        <br />
                        <input type='text' 
                                placeholder='Serving size' 
                                name="servingSize"
                                value={servingSize}
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