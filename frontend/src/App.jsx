import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import Preloader from "./Preloader";

function App() {
  const [quote, setQuote] = useState({
    id: null,
    author: null,
    description: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [quoteCount, setQuoteCount] = useState(0);
  const [quoteIdQueue, setQuoteIdQueue] = useState([]);

  const fetchQuote = async () => {
    if (quoteIdQueue.length === 0) {
      generateQuoteIdQueue(quoteCount);
    }
    console.log(quoteIdQueue);
    let id = quoteIdQueue.pop();
    const response = await (
      await fetch(
        `https://guarded-wildwood-51517-913a3c90f0b9.herokuapp.com/api/quotes/${id}`
      )
    ).json();
    return response;
  };

  const generateQuoteIdQueue = (count) => {
    setQuoteIdQueue(
      Array.from({ length: count }, (_, i) => i + 1).sort(
        () => Math.random() - 0.5
      )
    );
  };

  const generate = async () => {
    setQuote(await fetchQuote());
    setIsLoading(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch(
      `https://guarded-wildwood-51517-913a3c90f0b9.herokuapp.com/api/quotes/count`
    ).then(async (res) => {
      let response = await res.json();
      setQuoteCount(response.count);
      generateQuoteIdQueue(response.count);
    });
  }, []);

  useEffect(() => {
    if (quoteCount === 0 || quoteIdQueue.length === 0) return;
    fetchQuote().then((quote) => setQuote(quote));
    setTimeout(() => {
      setIsLoading(false);
    }, 23000);
    // }, 1000);
  }, [quoteCount, quoteIdQueue]);

  return (
    <div className="App">
      <video src="/waterfall.mp4" autoPlay loop muted />

      {isLoading ? (
        <div id="loader">
          <div id="loader-container">
            <Preloader />
          </div>
        </div>
      ) : (
        <div className="quoteblock">
          <Quote quote={quote} />
          <button onClick={generate}>Generate New Quote</button>
        </div>
      )}
    </div>
  );
}

export default App;
