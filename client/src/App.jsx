// import { useEffect, useState } from 'react'
// import io from 'socket.io-client'
// import './App.css'
// import Input from './components/Input'
// import Video from './components/Video'

// function App() {
//   const [score, setScore] = useState({ name: "", score: "" })
//   const socket=io('localhost:3000')
//   function connectSocket(){
//     socket.on('connection',(socket)=>{
//       console.log(socket)
//     })
//   }

//   function handleinput(e) {
//     const { name, value } = e.target;
//     setScore((prev) => ({
//       ...prev,
//       [name]: value, 
//     }));
//   }
// function send(){
//   socket.emit('send',score)
//   socket.on('score',(data)=>{
//     console.log(data)
//   })
// }

//   useEffect(()=>{
//     connectSocket()
//   },[])

//   return (
//     <>
//     <h1>Something live</h1>
//     {/* <Input name='name' placeholder={"Enter Your Name"} handleinput={handleinput} />
//     <Input name='score' placeholder={"Enter Your core"} handleinput={handleinput}/> */}
//     {/* <button onClick={send}>send</button> */}
//     <Video />
//     </>
//   )
// }

// export default App
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const result = await axios.post('http://localhost:5000/api/generate-response', {
        query,
      });
      setResponse(result.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received');
    } catch (error) {
      setResponse('Error generating response');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleClear = () => {
    setResponse('');
    setQuery('');
  };

  return (
    <div
      className="App"
      style={{
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333', margin: '10px 200px' }}>Quick-BOT🤖</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          style={{
            width: '100%',
            paddingRight: '0px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            marginBottom:"10px",
            height:"40px"
          }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
          <button
            onClick={handleClear}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            disabled={loading} // Disable clear button while loading
          >
            Clear
          </button>
        </div>
      </div>
      <div>
        <h2 style={{ color: '#333', fontWeight: 'bold' }}>Response:</h2>
        <div
          style={{
            backgroundColor: 'black',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontFamily: 'monospace',
            minHeight: '100px',
            color: '#fff',
          }}
        >
          {loading ? (
            <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Loading response...</p>
          ) : (
            <ReactMarkdown>{response}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;






