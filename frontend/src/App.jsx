import {useState, useEffect} from 'react';

import Quote from './components/Quote'

function App() {
  const [quote, setQuote] = useState({
    author: null,
    description: null
  })

  const fetchQuote = async () => {
    // return await fetch("https://animechan.vercel.app/api/random")
    return await fetch("http://localhost:8080/api/quotes")

    .then((response) => response.json());
    

  }

  const generate = async () => {
    setQuote(await fetchQuote());
  }

  useEffect(() => { fetchQuote().then(quote => setQuote(quote)); }, []);

  return (
<div className="App">
    <Quote quote={quote}/>
    <button onClick={generate}>Generate New Quote</button>
</div>
  )
}

export default App
