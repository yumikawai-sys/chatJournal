import './component.css'
import { useState, useEffect } from 'react';

function Toppage() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{getRandomMessage()} , []);

    async function getRandomMessage() {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/quotes");
    
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
    
        const resJson = await res.json();
        console.log('resJson', resJson);
        console.log('response.q', response.q);
        console.log('response.a', response.a);
        setResponse(resJson[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    return (
      <div>
        <div>
          <h3>Welcome back, you are amazing today... <br></br>Journal will help you understand yourself, heal you and move forward</h3>
          <img id="topImage" src="toppage.png" />
          {/* <p>Your Inspration</p> */}
          {loading ? (
            <p>Loading...</p>
            ) : (
              <>
              <p>{response.q}</p>
              <p>{response.a}</p>
              </>
             )}
           <button id="startBtn">Start</button>
        </div>
      </div>
    )
  }
  
  export default Toppage