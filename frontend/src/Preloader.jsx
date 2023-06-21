import Typewriter from "typewriter-effect";

function Preloader() {
  return (
    <div className="loader-text">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Hey you!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Experiencing burnout or imposter syndrome?")
            .pauseFor(2000)
            .deleteAll()
            .typeString(
              "Here are some fellow tech mates' quotes to inspire you."
            )
            .pauseFor(2000)
            .start();
        }}
        options={{
          delay: 75, // Delay between each character
          deleteSpeed: 200, // Speed of erasing
        }}
      />
    </div>
  );
}

export default Preloader;
