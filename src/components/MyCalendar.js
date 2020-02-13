import React from 'react';
import moment from 'moment'
import { Views, Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

class MyCalendar extends React.Component{
  render(){
    
    const mappableEvents = this.props.events.map(event => {
       event.start = new Date(event.start)
       event.end = new Date(event.end)
       return event
    })
    
    moment.locale("en-GB");
    const localizer = momentLocalizer(moment);
    const today = new Date();
    const date = (today.getMonth()+1)+'/'+today.getDate() + '/' + today.getFullYear();
    const allViews = Object.keys(Views).map(k => Views[k])

    return(
      <div className="calendar"> 
        <Calendar
        localizer={localizer}
        events={mappableEvents}
        step={30} //diff b/w hrs (i.e. 30 min interval)
        timeslots={1} //amount of lines in each hr
        defaultView="week"
        views={allViews}
        onSelectEvent={this.props.togglePopup}
        showMultiDayTimes
        min={new Date(2020, 2, 1, 8, 0)} // Calendar starts at 8.00 AM
        max={new Date(2020, 2, 1, 20, 0)} // Calendar goes to max time of 8.00 PM
        onNavigate={date => {
          this.setState({ selectedDate: date });
        }}
        Date={date} //calendar week rendered is determined by the current date
      />
    </div>
    )
  }
}
export default MyCalendar;
