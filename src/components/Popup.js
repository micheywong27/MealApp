import React from 'react';  
import TextField from '@material-ui/core/TextField';

class Popup extends React.Component { 

  render() {  
    console.log("in popup", this.props.startDefaultValue, this.props.endDefaultValue)
    return (  
        <div className='popup'>  
            <div className='popup\_inner'>  
                <h1>Update your event</h1> 
                <form noValidate className="update-meal-form"> 
                    <input type="text" 
                        placeholder="Recipe Name" 
                        name="recipeInputName"
                        value={this.props.recipeInputName}
                        onChange={(e) => this.props.setInputValue(e)}
                    />
                    <br />
                    <TextField
                    id="event-update-start"
                    label="Schedule start time"
                    type="datetime-local"
                    name="start"
                    key={1}  
                    value={this.props.start}  
                    onChange={e => this.props.changeTimes(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField
                    id="event-update-end"
                    label="Schedule end time"
                    type="datetime-local"
                    name="end"
                    key={2}  
                    value={this.props.end}  
                    onChange={e => this.props.changeTimes(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <br />
    {/* ON CLICK MAKE EVENT TIME AUTOFILL & THEN BE ABLE TO UPDATE ON SUBMIT */}
                    <button type="submit" onClick={(e) => {this.props.updateEvent(e)}}>Save</button>

    {/* ON CLICK MAKE EVENT DELETE -> DELETE FETCH */}
                    <button type="submit" onClick={this.props.deleteEvent}>Delete Event</button>
                </form>
            </div>  
        </div>  
        );  
    }  
}  
export default Popup;