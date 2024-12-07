import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const App = () => {
  const [time, setTime] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const refInterval = useRef(null);
  const totalSecondsRef = useRef(0); // Store total seconds to avoid recalculating

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const startTimer = () => {
    refInterval.current = setInterval(() => {
      if (totalSecondsRef.current > 0) {
        totalSecondsRef.current--;
        const updatedTime = new Date(totalSecondsRef.current * 1000)
          .toISOString()
          .substr(11, 8);
        setTime(updatedTime);
      } else {
        clearInterval(refInterval.current);
        setIsRunning(false);
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const [hours, minutes, seconds] = time.split(":").map(Number);
    totalSecondsRef.current = hours * 3600 + minutes * 60 + seconds;

    if (refInterval.current) clearInterval(refInterval.current); // Clear any running interval
    setIsRunning(true);
    startTimer();
  };

  const handlePauseResume = () => {
    if (isRunning) {
      clearInterval(refInterval.current); // Pause the timer
      setIsRunning(false);
    } else {
      setIsRunning(true);
      startTimer(); // Resume the timer
    }
  };

  useEffect(() => {
    return () => {
      if (refInterval.current) clearInterval(refInterval.current);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='time' step={1} value={time} onChange={handleChange} />
        <br />
        <br />
        <button type='submit'>Start</button>
      </form>
      <br />
      <button onClick={handlePauseResume}>
        {isRunning ? <FaPause /> : <FaPlay />} {isRunning ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default App;
