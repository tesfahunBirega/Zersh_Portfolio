import React from "react";
import Card from "../components/Card";

function SingleBlog() {
  const blogData = [
    {
      id: "1",
      author: "Author 1",
      title: "Blog 1",
      description:
        "This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://placekitten.com/400/300",
      category: "Technology",
      createdDate: "January 10, 2022",
    },
  ];
  return (
    <div className="relative z-0 bg-primary h-screen overflow-y-scroll scroll-smooth">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center h-1/2 px-20">
        {/* Header content goes here */}
      </div>
      <div className="overflow-y-auto px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogData[0]?.title}
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
