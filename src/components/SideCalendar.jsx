import './component.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPen, faBook, faCalendar } from '@fortawesome/free-solid-svg-icons';

const SideCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '');

    setSelectedDate(formattedDate);
    console.log('Selected Date:', formattedDate);

    // Navigate to the /calendar/:current_date route when the date changes
    navigate(`/calendar/${formattedDate}`);
  };

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
        <img id="toplogo" src="logo.png" />
        <div className='calendarfc'>
          <ul className="menuUl" style={{ listStyle: 'none' }}>
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

export default SideCalendar;
