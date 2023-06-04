
const Quote = ({ quote }) => {
  
  return (
    <div className="quote">
      <blockquote>{quote.description}</blockquote>
      <div className="author" title={quote.author}>
        {quote.author}
      </div>
    </div>
  );
};



export default Quote;
