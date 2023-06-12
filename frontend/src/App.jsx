import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import PuffLoader from "react-spinners/PuffLoader";

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
    console.log(quoteIdQueue)
    let id = quoteIdQueue.pop();
    const response = await (
      await fetch(`http://localhost:8080/api/quotes/${id}`)
    ).json();
    return response;
  };

  const generateQuoteIdQueue = (count) => {
    setQuoteIdQueue(
      Array
        .from({length: count}, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5)
    );
  };

  const generate = async () => { 
    setQuote(await fetchQuote());
    setIsLoading(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/quotes/count`).then(async (res) => {
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
    }, 1800);
  }, [quoteCount, quoteIdQueue])

  return (
    <div className="App">
      {isLoading ? (
        <div id="loader">
          <div id="loader-container">
            <PuffLoader
              id="puffloader"
              size={500}
              color={"#04724D"}
            />
            <div className="loader-text">
              <p>Hey you!</p>
            </div>
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
