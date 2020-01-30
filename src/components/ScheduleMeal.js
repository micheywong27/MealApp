import React from 'react';
import TextField from '@material-ui/core/TextField';
import MyCalendar from './MyCalendar';

class ScheduleMeal extends React.Component {
  
  render() {

    var today = new Date();
    var date = (today.getMonth()+1)+'/'+today.getDate() + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var currDate = date+' '+time;
    
    
    return (
      <div> 
        <h3>Today's date: {currDate}</h3>
        <form noValidate>
            <TextField
            id="datetime-local"
            label="Schedule meal"
            type="datetime-local"
            defaultValue="2020-01-31T10:30"  
            InputLabelProps={{
                shrink: true,
            }}
            />
        </form>
        <MyCalendar />
      </div>
    )
  }
}
export default ScheduleMeal;