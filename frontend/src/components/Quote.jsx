import React from 'react';

const Quote = ({ quote }) => {
  console.log(quote);

  
  return (
    <div className="quote">
      <div className="anime" title={quote.anime}>
        {quote.anime}
      </div>
      <blockquote>{quote.description}</blockquote>
      <div className="character" title={quote.author}>
        {quote.author}
      </div>
    </div>
  );
};

export default Quote;
