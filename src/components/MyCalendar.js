import React from 'react';
import moment from 'moment'
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en-GB");
//https://momentjs.com/timezone/
// var dec = moment("2014-12-01T12:00:00Z");
// dec.tz('America/New_York').format('ha z'); 

const localizer = momentLocalizer(moment);

const MyCalendar = () => (
  <div>
     <Calendar
      localizer={localizer}
      events={[
        {
          title: "Eat now",
          allDay: false,
          start: new Date(2020, 0, 2, 8, 15), // 8.15 AM on 2nd
          end: new Date(2020, 0, 2, 14, 0) // 2.00 PM on 2nd
        }
      ]}
      step={30} //diff b/w hrs (i.e. 30 min interval)
      timeslots={1} //amount of lines in each hr
      view="week"
      views={["week"]}
      min={new Date(2020, 0, 1, 8, 0)} // Calendar starts at 8.00 AM
      max={new Date(2020, 0, 1, 20, 0)} // Max will be 8.00 PM
      date={new Date(2020, 0, 1)}
    />
  </div>
)
export default MyCalendar;