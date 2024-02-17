import './component.css'
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

function Toppage() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(true);
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(()=>{
      const todayDate = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const newFormattedDate = todayDate.toLocaleDateString('en-US', options);
      console.log('Formatted date:', newFormattedDate);
  
      // Update the state with the formatted date
      setFormattedDate(newFormattedDate);
      
      getRandomMessage()} , []);

    async function getRandomMessage() {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/quotes");
    
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
    
        const resJson = await res.json();
        setResponse(resJson[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const navigate = useNavigate();

    const navigateToGetResponse = () => {
      navigate('/getResponse');
    };

    return (
      <div>
        <div>
          <div className='topbar'>
            <img id="toplogo" src="logo.png" />
            <h3>Discover unknown yourself... <br></br>AI analyzes your thoughts and emotions and gives you feedback</h3>
          </div>
          <div className='topimages'>
            <img className='slow-in show' id="topImagel" src="topred.png" />
            <img className='slow-in show' id="topImagem" src="toppage.png" />
            <img className='slow-in show' id="topImager" src="topyellow.png" />
          </div>
          <div className='bottomArea'>
            {loading ? (
              <p className='slow-in show'>Loading...</p>
              ) : (
                <>
                <p>Today is {formattedDate}</p>
                <p className='slow-in show'>&quot;{response.q}&quot; -  by {response.a}</p>
                </>
              )}
            <button id="startBtn" className='slow-in show' onClick={navigateToGetResponse}>Start</button>
           </div>
        </div>
      </div>
    )
  }
  
  export default Toppage