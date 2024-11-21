"use client";

import { useState, useEffect } from "react";

const TimeComponent = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to format the time
    const formatTime = (date: Date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    // Set initial time
    setCurrentTime(formatTime(new Date()));

    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div>{currentTime}</div>;
};

export default TimeComponent;
