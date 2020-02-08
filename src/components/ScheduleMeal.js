import React from 'react';
import TextField from '@material-ui/core/TextField';
import MyCalendar from './MyCalendar';
import Popup from './Popup';

const today = new Date();
const date = (today.getMonth()+1)+'/'+ today.getDate() + '/' + today.getFullYear();
const month = today.getMonth() <= 10 ?  '0' + (today.getMonth()+1) : (today.getMonth()+1)
const day = today.getDate() <= 10 ?  '0' + today.getDate() : today.getDate()
const timez = today.getMinutes() <= 10 ?  '0' + today.getMinutes() : today.getMinutes()
const time = today.getHours() + ":" + timez ;

class ScheduleMeal extends React.Component {
  state ={
    defaultValue: today.getFullYear() + '-' + month + '-' + day + 'T' + time,
  }

  autofillTime=(event)=>{
    console.log("in autofill time")
    this.props.autoFillEvent(event)
  }

  render() {
    return (  
      <div> 
        <h3 className="schedule-meal-form">Today is {date}</h3>
        {this.props.showPopup ?  
          <Popup  
                text='Click "Close Button" to hide popup'  
                // closePopup={this.props.togglePopup}
                recipeInputName= {this.props.recipeInputName}
                setInputValue={this.props.setInputValue}
                defaultValue={this.props.defaultValue}
          />  
          : 
            
            <form noValidate className="schedule-meal-form">
                <h3>Add recipe to calendar</h3>
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
                defaultValue={this.state.defaultValue}  
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
                defaultValue={this.state.defaultValue}  
                onChange={e => this.props.setInputValue(e)}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <br />
                <button type="submit" onClick={(e) => {this.props.addEvent(e)}}>Submit</button>
            </form>
          }
          
        <MyCalendar getEvents={this.props.getEvents}
                    events={this.props.events}
                    autoFillEvent={this.props.autoFillEvent}
                    autofillTime={this.autofillTime}
                    togglePopup={this.props.togglePopup}
                    showPopup={this.props.showPopup}
                    />
      </div>
    )
  }
}
export default ScheduleMeal;