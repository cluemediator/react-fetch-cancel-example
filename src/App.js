import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const abortController = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hub.dummyapis.com/delay?seconds=5', { signal: abortController.signal });
        const textData = await response.text();
        setData(textData);
      } catch (error) {
        if (error.name === 'AbortError') {
          // Request was cancelled
          setData('Request Aborted!')
          return;
        }
        // Handle other errors
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Cancel the request if component unmounts
    };
  }, []);

  const handleAbort = () => {
    abortController.abort(); // Cancel the request
  }

  return (
    <div>
      <h3>How to cancel a Fetch request in React - <a href="https://cluemediator.com" target='_blank'>Clue Mediator</a></h3>

      <div>Click on Abort button to cancel the request.</div>
      <button onClick={() => handleAbort()}>Abort</button>

      <div>Request Response:<br />{data}</div>
    </div>
  );
};

export default App;
