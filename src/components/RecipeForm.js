import React from 'react';
import FormPostMessage from './FormPostMessage';

class RecipeForm extends React.Component{
    render(){
        let {url, name, ingredients, instructions, cookTime, servingSize} = this.props ;
        return(
            <div className='form'>
                
                <form onSubmit={(e) => this.props.submitForm(e, url, name, ingredients, instructions, cookTime, servingSize)}>
                    <div className="add-my-recipe-form"> 
                        <h1>Tell us about your recipe!</h1>
                        <input className="form-input"
                                type="text" 
                                name="url"
                                placeholder="Insert image URL" 
                                value={url} 
                                onChange={e =>this.props.onChange(e)}/>
                        <br />
                        <input className="form-input"
                                    type='text' 
                                    placeholder='Name'
                                    name="name"
                                    value={name}
                                    onChange={(e) => this.props.onChange(e)} />
                        <br />
                        <input className="form-input"
                                    type='text' 
                                    placeholder='Cook time'
                                    name="cookTime"
                                    value={cookTime}
                                    onChange={(e) => this.props.onChange(e)} />
                        <br />
                        <input className="form-input"
                                type='text' 
                                placeholder='Serving size' 
                                name="servingSize"
                                value={servingSize}
                                onChange={(e) => this.props.onChange(e)}/>
                        <br />
                        <input className="form-input"
                                type='text' 
                                placeholder='Ingredients'
                                name="ingredients"
                                value={ingredients}
                                onChange={(e) => this.props.onChange(e)} />
                        <br />
                        <textarea className="form-input-instructions"
                                    type='text' 
                                    placeholder='Instructions'
                                    name="instructions"
                                    value={instructions}
                                    onChange={(e) => this.props.onChange(e)} />
                        <br />                         
                        <button >Submit</button>               
                    </div>
                </form> 
                {this.props.isSubmitted && <FormPostMessage />}
            </div>
        )
    }
}
export default RecipeForm;