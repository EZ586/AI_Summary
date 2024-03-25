import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tosText, setTOSText] = useState("")
  const [jsonData, setJsonData] = useState([])
  const [topic, setTopic] = useState("")
  const [clarifyTopic, setClarifyTopic] = useState('')
  const [clarifyTopicQuestion, setClarifyTopicQuestion] = useState('')
  const [gptClarification, setGPTClarification] = useState('')

  const fetchData = async (link) => {
    try {
        const encodedLink = encodeURI(link)
        const response = await fetch('http://127.0.0.1:5000/get/' + encodedLink + "/" + topic);
        const jsonData = await response.json();
        console.log(jsonData)
        setJsonData(jsonData)
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

  const fetchClarification = async ()=>{
    console.log("fethinc")
    const subheading = clarifyTopic
    const url = tosText
    const question = clarifyTopicQuestion

    const encodedLink = encodeURI(url)
    console.log(subheading)
    console.log(url)
    console.log(question)
    const response = await fetch('http://127.0.0.1:5000/clarify/' + encodedLink + "/" + subheading + "/" + question);
    const res = await response.text()
    setGPTClarification(res)

  }


  const handleClarifyTopicQuestionChange=(e)=>{
    setClarifyTopicQuestion(e.target.value)
  }

  const handleChangeClarifyTopic = (e) =>{
    setClarifyTopic(e.target.value)
    console.log(clarifyTopic)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(tosText)
  };

  const handleClarificationQuestionSubmit = (e)=>{
    e.preventDefault();
    console.log("click")
    fetchClarification()
  }

  const handleTOSChange = (e)=>{
      setTOSText(e.target.value)
  }

  const handleTopicChange = (e) => {
    setTopic(e.target.value)
    console.log(topic)
    
  }

  return (
   <div className='container'>

    <form>
      <div className='linkArea'>
        <p>Put link to terms and conditions here: </p>
        <input value={tosText} onChange={handleTOSChange}></input>
      </div>

      <hr/>

      <label className='section'>Select the topic(s) is most relevant to you.</label>
      <div>
        <input type='radio' value="Don't focus on a specific topic, give a general summary." name='relevant-topic' onChange={handleTopicChange}></input>
        <label> General Summary</label>
        <input type='radio' value="Intellectual Property" name='relevant-topic' onChange={handleTopicChange}></input>
        <label>Intellectual Property</label>
        <input type='radio' value="Consumer Protections" name='relevant-topic' onChange={handleTopicChange}></input>
        <label>Consumer Protections</label>
        <input type='radio' value="Age Restrictions" name='relevant-topic' onChange={handleTopicChange}></input>
        <label>Age Restrictions</label>
      </div>
   
      <hr/>

      <button onClick={handleSubmit}>Submit</button>

    </form>
    <div>
      {jsonData.map(item=>{
        return <div>
          <h1>{item.subheading}</h1>
          <p>{item.body}</p>
        </div>
      })}
    </div>

    <div className='clarify'>
      <h1>Clarify a section</h1>
      <div className='section'>
        <label htmlFor="clarify-topic">Select a section to clarify:</label>
        <select name='clarify-topic' onChange={handleChangeClarifyTopic}>
          {jsonData.map(item=>{
            return <option value={item.subheading} >{item.subheading}</option>
          })}
        </select>
      </div>
      <div className='section'>
        <label>Ask a clarification question.</label>
        <input onChange={handleClarifyTopicQuestionChange}></input>  
      </div> 
      <button onClick={handleClarificationQuestionSubmit}>Submit</button>
    </div>
    <div className='gptClarification'>
      {gptClarification}
    </div>
   </div>
  );
};
export default App;
