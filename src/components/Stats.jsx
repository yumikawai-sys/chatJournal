import './component.css'
import WeeklyChart from './WeeklyChart';
import PieChart from './PieChart';
import Feedback from './Feedback';
import { useState, useEffect } from 'react'

function Stats() {
  const [journals, setJournals] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [linejournals, setLinejournals] = useState([]);
  const [mood, setMood] = useState('');
  
  let inputText = '';
  let inputMood = '';

  useEffect(() => {
    // Fetch and get journals
    fetch('http://localhost:5000/api/journals')
      .then(response => response.json())
      .then(data => setJournals(data))
      .catch(error => console.error('Error fetching journals:', error));
  }, []);

  useEffect(() => {
    if (journals.length > 7) {
        for (let i=0;i<7;i++) {
          inputText += journals[i].input_text;
          inputMood += ' ' + journals[i].sentiment_label;
        }
        const mostCommon = findMostCommonText(inputMood);
        setMood(mostCommon);
        setLinejournals(journals.slice(0, 7));  //select the latest 7 journals
    } else {
        inputText = journals.map(item => item.input_text).join(' ');
        inputMood = journals.map(item => item.input_text).join(' ');
        setMood(findMostCommonText(inputMood));
        setLinejournals(journals);
    }
    
    fetch('http://localhost:5000/keyphrase-extraction/' + inputText, {
      method: 'POST', 
    })
      .then(response => response.json())
      .then(data => setKeywords(data))
      .catch(error => console.error('Error fetching keywords:', error));
  }, [journals]);
  
  function findMostCommonText(texts) {
    // Split the input string into an array of texts
    const textArray = texts.split(/\s+/);
  
    // Create an object to store the frequency of each text
    const textFrequency = {};
  
    // Count the frequency of each text
    textArray.forEach((text) => {
      textFrequency[text] = (textFrequency[text] || 0) + 1;
    });
  
    // Find the text with the highest frequency
    let mostCommonText = null;
    let highestFrequency = 0;
  
    Object.keys(textFrequency).forEach((text) => {
      if (textFrequency[text] > highestFrequency) {
        mostCommonText = text;
        highestFrequency = textFrequency[text];
      }
    });
  
    return mostCommonText;
  }

    return (
      <>
        <div className="inputArea">
          <div className="resArea">
            {journals.length === 0 ? (
              <p>No data available. Add journal entries to see the weekly chart.</p>
            ) : (
              <div className='charts'>
                
                <div className='piechart'>
                  <PieChart keywords={keywords}/>
                  <div className='message'>
                    <Feedback mood={mood} keywords={keywords}/>
                  </div>
                </div>
                <WeeklyChart journals={linejournals}/>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
  
  export default Stats