import React from "react";
import { Link } from "react-router-dom";
import { imgBaseUrl } from "../constants";

const Card = ({
  _id,
  author,
  title,
  description,
  imageUrl,
  category,
  createdDate,
}) => {
  return (
    <Link
      to={`/blogs/${_id}`}
      className="bg-tertiary hover:translate-y-[-10px] transition-transform cursor-pointer rounded-md shadow-md white-200 border-2-white"
    >
      <img
        src={`${imageUrl}`}
        alt={title}
        className="mb-4 w-full h-48 object-cover rounded-md"
      />
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2 text-bold ">{title}</h2>
        <p className="mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <p className="mt-2 px-4 py-2 bg-primary w-fit rounded">{category}</p>
          <p className="mt-2 px-4 py-2 bg-primary text-white rounded w-fit">{`by ${author}`}</p>
        </div>
        <p className="text-right mt-5"> {createdDate}</p>
      </div>
    </Link>
  );
};

export default Card;
