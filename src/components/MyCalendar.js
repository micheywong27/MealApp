import React from 'react';
import moment from 'moment'
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
//https://momentjs.com/timezone/
// var dec = moment("2014-12-01T12:00:00Z");
// dec.tz('America/New_York').format('ha z'); 

const localizer = momentLocalizer(moment);
var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate() + '/' + today.getFullYear();

const MyCalendar = () => (
  <div>
     <Calendar
      localizer={localizer}
      events={[
        {
          title: "Eat chicken parm now",
          allDay: false,
          start: new Date(2020, 0, 31, 8, 15), // 8.15 AM on 2nd
          end: new Date(2020, 0, 31, 14, 0) // 2.00 PM on 2nd
        },
        {
            title: "Go get that bacon egg n cheeeez to start the day",
            allDay: false,
            start: new Date(2020, 0, 29, 8, 15), // 8.15 AM on 2nd
            end: new Date(2020, 0, 31, 14, 0) // 2.00 PM on 2nd
          }
      ]}
      step={30} //diff b/w hrs (i.e. 30 min interval)
      timeslots={1} //amount of lines in each hr
      view="week"
      views={["week"]}
      min={new Date(2020, 2, 1, 8, 0)} // Calendar starts at 8.00 AM
      max={new Date(2020, 2, 1, 20, 0)} // Calendar goes to max time of 8.00 PM
      date={date} //calendar week rendered is determined by the current date
    
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
        }
    }
    />
    />
  </div>
)
export default MyCalendar;