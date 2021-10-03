const { useState, useEffect, useRef } = React;

function App() {
  const [currentDog, setCurrentDog] = useState([]);
  const [dogsList, setDogsList] = useState([]);
  const [timeRamaining, setTimeRamaining] = useState(5);

  useEffect(() => {
    dogAppears();
  }, []);

  const dogAppears = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => setCurrentDog(data.message));
  };

  const keyHandler = (event) => {
    if (event.key === "ArrowRight") {
      console.log(`${event.code}`);
      setDogsList([...dogsList, currentDog]);
      dogAppears();
    } else if (event.key === "ArrowLeft") {
      console.log(`${event.code}`);
      dogAppears();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    let tempTime = 5;
    const myTimer = setInterval(() => {
      setTimeRamaining(tempTime);
      if (tempTime > 0) {
        tempTime = tempTime - 1;
      } else {
        clearInterval(myTimer);
        dogAppears();
      }
    }, 1000);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      clearInterval(myTimer);
    };
  }, [currentDog]);

  return (
    <div className="app">
      <h1>Doggie Speed Dating</h1>
      <h3>
        Press the arrow keys on your keyboard. Left to skip, Right to Adopt.
      </h3>
      <section>
        <h3>Current Dog:</h3>
        <img className="dogPhoto" src={currentDog} />
        <h2>Time Remaining: {timeRamaining}</h2>
        <h3>You adopted {dogsList.length} dogs!</h3>
        <h3>Dog(s) Adopted:</h3>
        {dogsList.map((dogUrl) => {
          return <img className="dogAdopted" src={dogUrl} />;
        })}
      </section>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

// const myTimer = () => {
//   const someTimer = setInterval(() => {
//     setTimeRamaining(timeRamaining - 1);
//     console.log(timeRamaining);
//   }, 1000);
// };
