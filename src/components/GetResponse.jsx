import { useEffect, useState } from "react";
import './component.css';
import { greetings, positiveRes, neutralRes, negativeRes } from './greeting';

function GetResponse() {
    // 1st, 2nd, 3rd text (for fetch)
    const [textInput, setTextInput] = useState("");
    const [textsInput, setSTextInput] = useState("");
    const [texttInput, setTTextInput] = useState("");

    // 1st, 2nd, 3rd text (for display)
    const [textValue, setValue] = useState("");
    const [textsValue, setSValue] = useState("");
    const [texttValue, setTValue] = useState("");

    // 2nd, 3rd response
    const [message, setMessage] = useState("");
    const [smessage, setSMessage] = useState("");
    const [tmessage, setTMessage] = useState("");

    // Responses patterns 
    const [originalmessage, setOriginalMessage] = useState("");
    // const [positivemessage, setPositiveMessage] = useState("");
    // const [negativemessage, setNegativeMessage] = useState("");
    // const [neutralmessage, setNeutralMessage] = useState("");

    useEffect(()=>{getRandomMessage("original")} , []);

    // Read message from greeting.js
    function getRandomMessage(status) {
        if (status === "original") {
            // 1st greeting
            const greetinglength = greetings.length;
            const fgreeting = Math.floor(Math.random() * greetinglength);
            const selectedGreeting = greetings[fgreeting];
            setOriginalMessage(selectedGreeting);
        }
        
        // positive greeting
        else if (status === "positive") {
            const positivelength = positiveRes.length;
            const pgreeting = Math.floor(Math.random() * positivelength);
            const selectedPGreeting = positiveRes[pgreeting];
            return selectedPGreeting
        }
        
        // negative greeting
        else if (status === "negative") {
            const nglength = negativeRes.length;
            const nggreeting = Math.floor(Math.random() * nglength);
            const selectedNgGreeting = negativeRes[nggreeting];
            return selectedNgGreeting
        }

        // neutral greeting
        else {
            const nuelength = neutralRes.length;
            const ngreeting = Math.floor(Math.random() * nuelength + 1);
            const selectedNGreeting = neutralRes[ngreeting];
            return selectedNGreeting
        }
    }
    
    function saveInput(e) {
        
        // 1st
        if (!textValue && !textsValue && !texttValue) {
            setTextInput(e.target.value)
        }
        // 2nd
        else if (!textsValue && !texttValue) {
            setSTextInput(e.target.value)
        }
        // 3rd
        else if (!texttValue) {
            setTTextInput(e.target.value)
        }
    }

    async function fetchPipeline() {
        // no endpoint -> return
        if (!textInput && !textsInput && !texttInput) return

        let txt = '';

        // Change end point depending on the order
        // 1st time
        if (!textsInput && !texttInput) {
            txt = textInput;
        }
        // 2nd time
        else if (!texttInput) {
            txt = textsInput;
        }
        // 3rd time
        else {
            txt = texttInput;
        }
        
        try {
        let resp = await fetch(`http://127.0.0.1:5000/${txt}`) 
        const json = await resp.json()
        console.log('json', json);

        // change destination depending on the order of input
        console.log('message', message);
        console.log('smessage', smessage);
        console.log('tmessage', tmessage);

        if (!message && !smessage && !tmessage) {
            console.log('json.sentiment_label', json.sentiment_label);
            
            if (json.sentiment_label === "POSITIVE") {
                setMessage(getRandomMessage("positive"));
            } else if (smessage.sentiment_label === "NEGATIVE") {
                setMessage(getRandomMessage("negative"));
            } else 
                setMessage(getRandomMessage("neutral"));
        }
        else if (!smessage && !tmessage) {
            console.log('json.sentiment_label', json.sentiment_label);
            
            if (json.sentiment_label === "POSITIVE") {
                setSMessage(getRandomMessage("positive"));
            } else if (smessage.sentiment_label === "NEGATIVE") {
                setSMessage(getRandomMessage("negative"));
            } else 
                setSMessage(getRandomMessage("neutral"));
        }
        else if (!tmessage) {
            console.log('json.sentiment_label', json.sentiment_label);
            
            if (json.sentiment_label === "POSITIVE") {
                setTMessage(getRandomMessage("positive"));
            } else if (tmessage.sentiment_label === "NEGATIVE") {
                setTMessage(getRandomMessage("negative"));
            } else 
                setTMessage(getRandomMessage("neutral"));
        }

        // Clear all
        setTextInput("");
        setSTextInput("");
        setTTextInput("");

        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    }

    async function checkResponce()
    {
        if (!textInput && !textsInput && !texttInput) return

        // fetch
        fetchPipeline();
        
        // Set value for display
        setValue(textInput);
        setSValue(textsInput);
        setTValue(texttInput);
    }

    return (
      <div className="inputArea">
        <div className="resArea">
            {/* 1st */}
            <div className="firstArea">
                <div id="greeting_info">{originalmessage}</div>
                {message && <div id="text_info">{textValue}</div>}
            </div>
            {/* 2nd */}
            <div className="secondArea">
                {message&& <div id="greeting_info">{smessage}</div>}
                {smessage&& <div id="text_info">{textsValue}</div>}

            </div>
            {/* 3rd */}
            <div className="thirdArea">
                {smessage&& <div id="greeting_info">{tmessage}</div>}
                {tmessage&& <div id="text_info">{texttValue}</div>}
            </div>
        </div>

        {/* Input Text */}
        <div className="inputText">
            <textarea value={textInput} onChange={saveInput} cols="90" rows="2"></textarea>
            <button className="writeBtn" onClick={checkResponce}>+</button>
        </div>
      </div>
    )
  }
  
  export default GetResponse