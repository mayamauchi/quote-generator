import {useState, useEffect} from 'react';

import Quote from './components/Quote'

function App() {
  const [quote, setQuote] = useState({
    quote: null,
    author: null,
  })

  const fetchQuote = async () => {
    // return await fetch("https://animechan.vercel.app/api/random")
    return await fetch("https://api.goprogram.ai/inspiration")

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
