import './component.css'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function MyCalendar() {
    const [journals, setJournals] = useState([]);
    const { current_date } = useParams();

    useEffect(() => {
    // Fetch data from the Flask API endpoint
    fetch('http://localhost:5000/api/journal/' + current_date)
        .then(response => response.json())
        .then(data => setJournals(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [current_date]);

    return (
        <>
        <div className="inputArea">
          <div className="resArea">
            {journals.length > 0 ? (
            journals.map(journal => (
                <div key={journal._id} id="calendar_info">
                    {journal.formatted_date}<br></br>{journal.input_text}
                </div>
            ))
            ) : (
            <div>No journals available for the selected date.</div>
            )}
          </div>
        </div>
      </>
    )
  }
  
  export default MyCalendar