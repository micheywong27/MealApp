import React from 'react';
import moment from 'moment'
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

class MyCalendar extends React.Component{
   

  render(){

    const mappableEvents = this.props.events.map(event => {
       event.start = new Date(event.start)
       event.end = new Date(event.end)
       return event
    })
    
    moment.locale("en-GB");
    //https://momentjs.com/timezone/
    // var dec = moment("2014-12-01T12:00:00Z");
    // dec.tz('America/New_York').format('ha z');   
    const localizer = momentLocalizer(moment);
    var today = new Date();
    var date = (today.getMonth()+1)+'/'+today.getDate() + '/' + today.getFullYear();
    
    return(
      <div>
      <Calendar
       localizer={localizer}
       events={mappableEvents}
       step={30} //diff b/w hrs (i.e. 30 min interval)
       timeslots={1} //amount of lines in each hr
       defaultView="week"
       views={["week"]}
       min={new Date(2020, 2, 1, 8, 0)} // Calendar starts at 8.00 AM
       max={new Date(2020, 2, 1, 20, 0)} // Calendar goes to max time of 8.00 PM
       onNavigate={date => {
         this.setState({ selectedDate: date });
       }}
       Date={date} //calendar week rendered is determined by the current date
     
     //event styling
     eventPropGetter={() => {
         let newStyle = {
             backgroundColor: "maroon",
             color: 'white',
             borderRadius: "15px", //rounds border
             borderColor:"white",
             borderWidth: "2px", //how thick the border is
             fontFamily: "cursive",
             fontSize: "20px",
             textAlign: "center"
         };
          return {
             className: "",
             style: newStyle
          };
         }}
      />
   </div>
    )
  }
}
export default MyCalendar;
