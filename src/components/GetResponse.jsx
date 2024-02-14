import { useEffect, useState } from "react";
import '@huggingface/transformers';
import { GPT2Tokenizer, GPT2LMHeadModel } from '@huggingface/transformers';
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

    // 2nd, 3rd response (for display)
    const [message, setMessage] = useState("");
    const [smessage, setSMessage] = useState("");

    // Responses patterns 
    const [originalmessage, setOriginalMessage] = useState("");
    const [fpmessage, setfpMessage] = useState("");
    const [fngmessage, setfngMessage] = useState("");
    const [fnumessage, setfnuMessage] = useState("");
    const [spmessage, setspMessage] = useState("");
    const [sngmessage, setsngMessage] = useState("");
    const [snumessage, setsnuMessage] = useState("");

    // Save sentiment (to save for stats)
    const [resFirst, setresFirst] = useState("");
    const [resSecond, setresSecond] = useState("");
    const [resThird, setresThird] = useState("");

    // const [summary, setSummary] = useState("");

    useEffect(()=>{getRandomMessage("original")} , []);

    // Read message from greeting.js
    function getRandomMessage(status) {

        // Set messages (original, 1st, 2nd (posi, nega, neu))
        if (status === "original") {
            // original message
            const greetinglength = greetings.length;
            const fgreeting = Math.floor(Math.random() * greetinglength);
            const selectedGreeting = greetings[fgreeting];
            setOriginalMessage(selectedGreeting);

            // positive (1st responses + 2nd)
            const positivelength = positiveRes.length;
            const fpositive = Math.floor(Math.random() * positivelength - 1);
            const selectedfpositive = positiveRes[fpositive];
            setfpMessage(selectedfpositive);
            const selectedspositive = positiveRes[fpositive + 1];
            setspMessage(selectedspositive);

            // negative (1st responses + 2nd)
            const negativelength = negativeRes.length;
            const fnegative = Math.floor(Math.random() * negativelength - 1);
            const selectedfnegative = negativeRes[fnegative];
            setfngMessage(selectedfnegative);
            const selectedsnegative = negativeRes[fnegative + 1];
            setsngMessage(selectedsnegative);

            // neutral (1st responses + 2nd)
            const neutrallength = neutralRes.length;
            const fneutral = Math.floor(Math.random() * neutrallength - 1);
            const selectedfneutral = neutralRes[fneutral];
            setfnuMessage(selectedfneutral);
            const selectedsneutral = neutralRes[fneutral + 1];
            setsnuMessage(selectedsneutral);
        }
        
        // positive greeting
        // else if (status === "positive") {
        //     const positivelength = positiveRes.length;
        //     const pgreeting = Math.floor(Math.random() * positivelength);
        //     const selectedPGreeting = positiveRes[pgreeting];
        //     return selectedPGreeting
        // }
        
        // // negative greeting
        // else if (status === "negative") {
        //     const nglength = negativeRes.length;
        //     const nggreeting = Math.floor(Math.random() * nglength);
        //     const selectedNgGreeting = negativeRes[nggreeting];
        //     return selectedNgGreeting
        // }

        // // neutral greeting
        // else {
        //     const nuelength = neutralRes.length;
        //     const ngreeting = Math.floor(Math.random() * nuelength + 1);
        //     const selectedNGreeting = neutralRes[ngreeting];
        //     return selectedNGreeting
        // }
    }
    
    function saveInput(e) {
        if (!resFirst && !resSecond && !resThird) {
            setTextInput(e.target.value)
        } else if (!resSecond && !resThird) {
            setSTextInput(e.target.value)
        } else {
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
            console.log('resFirst', resFirst);
            console.log('resSecond', resSecond);
            console.log('resThird', resThird);
            
            // Responses
            if (!resFirst && !resSecond && !resThird) {
                // Save json
                setresFirst(json)

                if (json.sentiment_label === "POSITIVE") {
                    setMessage(fpmessage);
                } else if (json.sentiment_label === "NEGATIVE") {
                    setMessage(fngmessage);
                } else 
                    setMessage(fnumessage);
            }
            else if (!resSecond && !resThird) {
                // Save json
                setresSecond(json)

                if (json.sentiment_label === "POSITIVE") {
                    setSMessage(spmessage);
                } else if (smessage.sentiment_label === "NEGATIVE") {
                    setSMessage(sngmessage);
                } else 
                    setSMessage(snumessage);
            } 
            else if (!resThird) {
                // Save json
                setresThird(json)

                // Make a summary
                const alltext = textValue + textsValue + texttValue;
                summarizeMessages(alltext);

            }
            // Clear all
            // setTextInput("");
            // setSTextInput("");
            // setTTextInput("");

        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    }

    async function summarizeMessages(txt) {
        // Tokenizer and Model from Hugging Face Transformers library
        const tokenizer = new GPT2Tokenizer.fromPretrained('gpt2');
        const model = new GPT2LMHeadModel.fromPretrained('gpt2');

        // Tokenize and generate summary
        const inputs = tokenizer.encode(txt, { return_tensors: 'pt' });
        const outputs = await model.generate(inputs, { max_length: 50, min_length: 10, length_penalty: 2.0, num_beams: 4 });

        const summarizedResult = tokenizer.decode(outputs[0], { skipSpecialTokens: true });
        console.log('Summarized Result:', summarizedResult);
    }

    async function checkResponce()
    {
        if (!textInput && !textsInput && !texttInput) return

        try {
            await fetchPipeline();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        
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
                {resFirst && <div id="text_info">{textValue}</div>}
            </div>
            {/* 2nd */}
            <div className="secondArea">
                {resFirst && <div id="greeting_info">{message}</div>}
                {resSecond && <div id="text_info">{textsValue}</div>}

            </div>
            {/* 3rd */}
            <div className="thirdArea">
                {resSecond&& <div id="greeting_info">{smessage}</div>}
                {resThird&& <div id="text_info">{texttValue}</div>}
            </div>
        </div>

        {/* Input Text */}
        <div className="inputText">
            <textarea value={!resFirst && !resSecond && !resThird
                ? textInput
                : !resSecond && !resThird
                ? textsInput
                : texttInput
                ? texttInput
                :""
                } 
                onChange={saveInput} cols="90" rows="2"></textarea>
            <button className="writeBtn" onClick={checkResponce}>+</button>
        </div>
      </div>
    )
  }
  
  export default GetResponse