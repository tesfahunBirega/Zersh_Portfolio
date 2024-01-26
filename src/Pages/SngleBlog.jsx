import React, { useState } from "react";
import Card from "../components/Card";

function SingleBlog() {
  const blog = {
    id: "1",
    author: "Author 1",
    title: "Blog 1",
    description:
      "This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: "This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus justo vel turpis blandit, eu hendrerit lectus auctor. Nullam et orci auctor, hendrerit sapien at, varius dui. Nam quis metus ut orci ullamcorper vulputate.",
    imageUrl: "https://placekitten.com/400/300",
    category: "Technology",
    createdDate: "January 10, 2022",
  };
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="relative z-0 bg-primary h-screen overflow-y-scroll scroll-smooth">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center h-1/2 px-20">
        {/* Header content goes here */}
      </div>
      <div className="overflow-y-auto px-20">
        <div className="">
          <div className="">
            <div
              className={`max-w-6xl mx-auto my-8 px-8 py-4 ${
                darkMode ? "bg-tertiary text-white" : "bg-gray-600 text-white"
              } shadow-md rounded-md transition-colors duration-500`}
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 focus:outline-none ${
                    darkMode
                      ? "bg-white text-gray-800"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
              <h1
                className={`text-4xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {blog.title}
              </h1>
              <p
                className={`text-gray-600 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                By {blog.author}
              </p>
              <p
                className={`text-gray-500 mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {blog.createdDate}
              </p>
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full mb-6 rounded-md"
              />
              <p
                className={`text-lg leading-relaxed mb-6 ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}
              >
                {blog.description}
              </p>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <span
                    className={`text-gray-500 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Category:
                  </span>
                  <span
                    className={`text-gray-700 bg-gray-200 px-2 py-1 ml-2 rounded-md ${
                      darkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  >
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4">
                <h2
                  className={`text-2xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Body
                </h2>
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  {blog.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;