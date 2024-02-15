import './component.css'
import PropTypes from "prop-types";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SideCalendar = ({home, diary, stats}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Add logic to navigate to the day page with the selected date
    console.log('Selected Date:', date);
  };

  const goTo = (reference) => {
    window.scrollTo({
      top: reference.current.offsetTop - 50,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className='calendar'>
        <div className='calendarfc'>
          <ul className="menuUl" style={{ listStyle:'none'}}>
              <li id="menult" onClick={(e)=> {e.preventDefault(); goTo(home)}}>Home</li>
              <li id="menult" onClick={(e)=> {e.preventDefault(); goTo(diary)}}>Diary</li>
              <li id="menult" onClick={(e)=> {e.preventDefault(); goTo(stats)}}>Stats</li>
          </ul>
        </div>

        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="small-calendar"
        />
      </div>
    </div>
  );
};

SideCalendar.propTypes = {
  home: PropTypes.any.isRequired,
  diary: PropTypes.any.isRequired,
  stats: PropTypes.any.isRequired,
};
export default SideCalendar;

  