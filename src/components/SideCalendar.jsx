import './component.css'

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SideCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Add logic to navigate to the day page with the selected date
    console.log('Selected Date:', date);
  };

  return (
    <div>
      <div className='calendar'>
        {/* <h2>My Calendar</h2> */}
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="small-calendar"
        />
      </div>
    </div>
  );
};

export default SideCalendar;

  