import React, { useState, useEffect, useRef } from "react";

// Define the props interface for TypeScript
export interface ITimerProps {
  initialTimestamp: number;
}

const Timer: React.FC<ITimerProps> = ({ initialTimestamp }) => {

  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    intervalRef.current = intervalId;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const elapsedTime = currentTime - initialTimestamp;
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;



  return (
    <div>
      {formattedTime}
    </div>
  );
};

export default Timer;
