import './component.css'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function MyCalendar() {
    const [journals, setJournals] = useState([]);
    const { current_date } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    // Fetch data from the Flask API endpoint
    fetch('http://localhost:5000/api/journal/' + current_date)
        .then(response => response.json())
        .then(data => setJournals(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [current_date]);

    
    const handleHover = () => {
      setIsOpen(!isOpen);
    };

    return (
        <>
        <div className="inputArea">
          <div className="resArea">
            <div className={`book ${isOpen ? 'open' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleHover}>
              <div className="book-cover"></div>
              <div className="book-text">
                {journals.length > 0 ? (
                journals.map(journal => (
                    <div key={journal._id} id="calendar_info">
                        <p>{journal.formatted_date}</p>
                        <p>{journal.input_text}</p>
                    </div>
                ))
                ) : (
                  <div id="calendar_info">
                    <p>We can&rsquo;t find your diary for the day...</p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p>...That is okay. See you again soon!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default MyCalendar