import React from 'react';
import TextField from '@material-ui/core/TextField';
import MyCalendar from './MyCalendar';
import Popup from './Popup';
import FormPostMessage from './FormPostMessage';

const today = new Date();
const date = (today.getMonth()+1)+'/'+ today.getDate() + '/' + today.getFullYear();
const month = today.getMonth() < 10 ?  '0' + (today.getMonth()+1) : (today.getMonth()+1)
const day = today.getDate() < 10 ?  '0' + today.getDate() : today.getDate()
const timez = today.getMinutes() < 10 ?  '0' + today.getMinutes() : today.getMinutes()
const time = today.getHours() + ":" + timez ;

class ScheduleMeal extends React.Component {
  state ={
    startDefaultValue: today.getFullYear() + '-' + month + '-' + day + 'T' + time,
    endDefaultValue: today.getFullYear() + '-' + month + '-' + day + 'T' + time,
    start: '',
    end: '',
    eventId: ''
  }

  changeTimes = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  togglePopup=(event)=>{ 
    console.log("in toggle popup", event) 
    const eventId = event.id
      fetch(`http://127.0.0.1:3000/create_events/${eventId}`)
      .then(resp => resp.json())
      .then(event =>{
        console.log(event)
        this.setState({
          start: event.start,
          end: event.end,
          eventId: eventId
        },  this.props.resetShowPopup(event))
      })
      .catch(error => {
        console.log('Error fetching & parsing data', error);
      })
  }  

    //from Popup, on Save button, update the event.id with new info
    updateEvent=()=>{
      const eventId = this.state.eventId
      fetch(`http://127.0.0.1:3000/create_events/${eventId}`,
            {method : 'PUT',
            body: JSON.stringify(
              {title: this.props.recipeInputName,
              start: this.state.start,
              end: this.state.end
              }

            ),
            headers: {
                'Content-Type': 'application/json'
            }
          })
      .then(resp => resp.json())
    }

    deleteEvent=()=>{
      const eventId = this.state.eventId
      fetch(`http://127.0.0.1:3000/create_events/${eventId}`, {method : 'delete'})
      .then(resp => resp.json())
    }

  render() {
    return (  
      <div> 
        {this.props.showPopup ?  
          (<Popup  
                text='Click "Close Button" to hide popup'  
                recipeInputName={this.props.recipeInputName}
                setInputValue={this.props.setInputValue}
                start={this.state.start}
                end={this.state.end}
                deleteEvent={this.deleteEvent}
                updateEvent={this.updateEvent}
                changeTimes={this.changeTimes}
          />)  
          : 
            (<div className="add-recipe-form"> 
             <form noValidate className="schedule-meal-form">
               <h2 className="todays-date">Today is {date}</h2>
                <h2>Add recipe to calendar</h2>
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
                defaultValue={this.state.startDefaultValue}  
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
                defaultValue={this.state.endDefaultValue}  
                onChange={e => this.props.setInputValue(e)}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <br />
                <button type="submit" onClick={this.props.addEvent}>Submit</button>
            </form>
            </div>)
          }
          
        <MyCalendar getEvents={this.props.getEvents}
                    events={this.props.events}
                    autoFillEvent={this.props.autoFillEvent}
                    togglePopup={this.togglePopup}
                    />
      </div>
    )
  }
}
export default ScheduleMeal;