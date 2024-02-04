import React, { useState } from "react";

const RandomColorBeamCard = () => {
  const [cardColor, setCardColor] = useState("#ffffff"); // Initial color
  const [beamPosition, setBeamPosition] = useState({ x: 0, y: 0 });
  const [showBeam, setShowBeam] = useState(false);

  // Function to generate a random hex color code
  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Handler for mouse move event to track pointer position
  const handleMouseMove = (e) => {
    setBeamPosition({ x: e.clientX, y: e.clientY });
    if (showBeam) {
      const newColor = generateRandomColor();
      setCardColor(newColor);
    }
  };

  return (
    <div className="w-80 h-48 bg-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 opacity-60"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-white mb-2">Happy Birthday!</h2>
        <p className="text-lg text-white">
          Wishing you a day filled with joy, laughter, and lots of cake!
        </p>
      </div>
    </div>
  );
};

export default RandomColorBeamCard;
