import React from 'react';  
import TextField from '@material-ui/core/TextField';

class Popup extends React.Component { 

  render() {  
    return (  
        <div className='popup'>  
            <div className='popup\_inner'>  
                <h1>Update your event</h1> 
                <form noValidate className="schedule-meal-form"> 
                <input type="text" 
                        placeholder="Recipe Name" 
                        name="recipeInputName"
                        value={this.props.recipeInputName}
                        onChange={(e) => this.props.setInputValue(e)}
                        />
                    <br />
                    <TextField
                    id="datetime-local-start"
                    label="Schedule start time"
                    type="datetime-local"
                    name="startTime"
                    defaultValue={this.props.defaultValue}  
                    onChange={e => this.props.setInputValue(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField
                    id="datetime-local-end"
                    label="Schedule end time"
                    type="datetime-local"
                    name="endTime"
                    defaultValue={this.props.defaultValue}  
                    onChange={e => this.props.setInputValue(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <br />
    {/* ON CLICK MAKE EVENT TIME AUTOFILL & THEN BE ABLE TO UPDATE ON SUBMIT */}
                    <button type="submit" onClick={(e) => {this.props.addEvent(e)}}>Save</button>

    {/* ON CLICK MAKE EVENT DELETE -> DELETE FETCH */}
                    <button type="submit">Delete Event</button>
                </form>
            </div>  
        </div>  
        );  
    }  
}  

export default Popup;