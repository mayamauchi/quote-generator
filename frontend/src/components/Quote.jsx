import React from 'react'

function Quote({quote}) {


  return (
    <div className="quote">
        <div className="anime" title={quote.anime}>{quote.anime}</div>
        <blockquote>{quote.quote}    </blockquote>
        <div className="character" title={quote.author}>{quote.author}</div>
    </div>
  )
}

export default Quote
