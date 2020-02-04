import React from 'react';
import TextField from '@material-ui/core/TextField';
import MyCalendar from './MyCalendar';

const today = new Date();
const date = (today.getMonth()+1)+'/'+ today.getDate() + '/' + today.getFullYear();

const month = today.getMonth() <= 10 ?  '0' + (today.getMonth()+1) : (today.getMonth()+1)
const day = today.getDate() <= 10 ?  '0' + today.getDate() : today.getDate()
const timez = today.getMinutes() <= 10 ?  '0' + today.getMinutes() : today.getMinutes()
const time = today.getHours() + ":" + timez ;
const currDate = date+' '+time;

class ScheduleMeal extends React.Component {
  
  state ={
    defaultValue: today.getFullYear() + '-' + month + '-' + day + 'T' + time,
    setDate: ''
  }

  changeDate = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name] : e.target.value
    })
  }



  render() {
    console.log("set date is:", this.state.setDate)
    return (  
      <div> 
        <h3>Today's date: {currDate}</h3>
        <form noValidate>
            <h3>Add recipe to calendar</h3>
            <input type="text" placeholder="Recipe Name" name="recipe"/>
            <br />
            <TextField
            id="datetime-local"
            label="Schedule meal"
            type="datetime-local"
            name="setDate"
            defaultValue={this.state.defaultValue}  
            onChange={e => this.changeDate(e)}

            InputLabelProps={{
                shrink: true,
            }}
            />
            <br />
            <button type="submit" onClick={(e) => {this.props.addEvent(e, this.state.setDate)}}>Submit</button>
        </form>
        <MyCalendar />
      </div>
    )
  }
}
export default ScheduleMeal;