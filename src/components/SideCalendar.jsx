import './component.css'
// import PropTypes from "prop-types";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate  } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faBook, faCalendar } from '@fortawesome/free-solid-svg-icons';

const SideCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Add logic to navigate to the day page with the selected date
    console.log('Selected Date:', date);
  };

  const navigate = useNavigate();

    const navigateToHome = () => {
      navigate('/');
    };
  

    const navigateToDiary = () => {
      navigate('/getResponse');
    };

    const navigateToStats = () => {
      navigate('/stats');
    };

    const navigateToHistory = () => {
      navigate('/history');
    };

  return (
    <>
      <div className='calendar'>
        <div className='calendarfc'>
          <ul className="menuUl" style={{ listStyle:'none'}}>
              <li><button id="menult" onClick={navigateToHome}><div className="menuName"><FontAwesomeIcon icon={faHome} /> Home</div></button></li>
              <li><button id="menult" onClick={navigateToDiary}><div className="menuName"><FontAwesomeIcon icon={faPen} /> Write a Diary</div></button></li>
              <li><button id="menult" onClick={navigateToHistory}><div className="menuName"><FontAwesomeIcon icon={faBook} /> History</div></button></li>
              <li><button id="menult" onClick={navigateToStats}><div className="menuName"><FontAwesomeIcon icon={faCalendar} /> Overview</div></button></li>
          </ul>
        </div>

        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="small-calendar"
        />
      </div>
    </>
  );
};

// SideCalendar.propTypes = {
//   home: PropTypes.any.isRequired,
//   diary: PropTypes.any.isRequired,
//   stats: PropTypes.any.isRequired,
// };
export default SideCalendar;

  