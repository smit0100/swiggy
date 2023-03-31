import React, { useState, useEffect } from 'react';

const OTPTimer = React.memo(({ onTimerComplete }) => {
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      onTimerComplete();
    }
  }, [remainingTime, onTimerComplete]);

  const formattedTime = remainingTime.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return <div>{formattedTime} seconds</div>;
});

export default OTPTimer;