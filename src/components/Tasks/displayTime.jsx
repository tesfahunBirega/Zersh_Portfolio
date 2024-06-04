import React from 'react';

const DisplayTime = ({ duration }) => {
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return (
    <div className="clock">
     {hours && <span>{formatTime(hours)}:</span>} 
     {minutes &&  <span>{formatTime(minutes)}:</span> }
      {seconds &&  <span>{formatTime(seconds)}</span>}
    </div>
  );
};

export default DisplayTime;


