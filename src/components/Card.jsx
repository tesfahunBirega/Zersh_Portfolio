import React from "react";

const Card = ({ title, description, imageUrl, category, createdDate }) => {
  return (
    <div className="bg-tertiary p-6 rounded-md shadow-md white-200">
      <img
        src={imageUrl}
        alt={title}
        className="mb-4 w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mb-2 text-bold ">{title}</h2>
      <p className="mb-2">{description}</p>
      <p className="mt-2 px-4 py-2 bg-primary w-fit">{category}</p>
      <p className="text-right mt-2"> {createdDate}</p>
    </div>
  );
};

export default Card;
