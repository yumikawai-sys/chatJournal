import './component.css'
import WeeklyChart from './WeeklyChart';
import PieChart from './PieChart';
import { useState, useEffect } from 'react'

function Stats() {
  const [journals, setJournals] = useState([]);
  const [keywords, setKeywords] = useState([]);
  let inputText = '';

  useEffect(() => {
    // Fetch data from the Flask API endpoint
    fetch('http://localhost:5000/api/journals')
      .then(response => response.json())
      .then(data => setJournals(data))
      .catch(error => console.error('Error fetching journals:', error));
  }, []);

  useEffect(() => {
    console.log('journals', journals.length);
    if (journals.length > 7) {
        for (let i=0;i<7;i++) {
          inputText += journals[i].input_text;
        }
    } else {
        inputText = journals.map(item => item.input_text).join(' ');
    }
    console.log('inputText', inputText);

    fetch('http://localhost:5000/keyphrase-extraction/' + inputText, {
      method: 'POST', 
    })
      .then(response => response.json())
      .then(data => setKeywords(data))
      .catch(error => console.error('Error fetching keywords:', error));
  }, [journals]);
  
    return (
      <>
        <div className="inputArea">
          <div className="resArea">
            {journals.length === 0 ? (
              <p>No data available. Add journal entries to see the weekly chart.</p>
            ) : (
              <div className='charts'>
                <WeeklyChart journals={journals}/>
                <div className='piechart'>
                  <PieChart keywords={keywords}/>
                  <div className='message'>
                    Message
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
  
  export default Stats