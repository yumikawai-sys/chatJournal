import { useEffect, useState } from "react";

function GetResponse() {
    const [textInput, setTextInput] = useState("");
    const [changeTxt, setChangeTxt] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(()=> {fetchPipeline()}, [changeTxt]);

    async function fetchPipeline() {
        if (!textInput) return
        try {
        let resp = await fetch(`http://127.0.0.1:5000/${textInput}`) 
        const json = await resp.json()
        console.log('json', json);
        setMessage(json);
        setChangeTxt(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    }

    async function checkResponce()
    {
        setChangeTxt(true);
    }

    return (
      <>
        <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} cols="60" rows="20"></textarea>
        <button onClick={checkResponce}>Analyse</button>
        <div id="text_info">{message.sentiment_label}</div>
        <div id="text_info">{message.sentiment_score}</div>
      </>
    )
  }
  
  export default GetResponse