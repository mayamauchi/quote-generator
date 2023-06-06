import { useState, useEffect } from "react";
import Quote from "./components/Quote";
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const [quote, setQuote] = useState({
    author: null,
    description: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuote = async () => {
    return await fetch("http://localhost:8080/api/quotes/random").then(
      (response) => response.json()
    );
  };

  const generate = async () => {
    setQuote(await fetchQuote());
    setIsLoading(true);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuote().then((quote) => setQuote(quote));
    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  }, []);


  return (
    <div className="App">
      {isLoading ? (
        <div id="loader">
          <div id="loader-container">
            <PuffLoader
              id="puffloader"
              size={500}
              color={"#04724D"}
              isLoading={isLoading}
              css={overide}
              //figure out how to do cssoveride. Possibly last year's version? 
            />
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
