import React from "react";
import Card from "../components/Card";

function Blogs() {
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
    {
      id: "2",
      author: "Author 1",
      title: "Blog 2",
      description:
        "This is the second blog post. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: "https://placekitten.com/401/300",
      category: "Travel",
      createdDate: "February 15, 2022",
    },
    {
      id: "3",
      author: "Author 3",
      title: "Blog 3",
      description:
        "This is the third blog post. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      imageUrl: "https://placekitten.com/402/300",
      category: "Food",
      createdDate: "March 20, 2022",
    },
    {
      id: "1",
      author: "Author 3",
      title: "Blog 3",
      description:
        "This is the third blog post. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      imageUrl: "https://placekitten.com/402/300",
      category: "Food",
      createdDate: "March 20, 2022",
    },
  ];
  return (
    <div className="relative z-0 bg-primary h-screen overflow-y-scroll scroll-smooth">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center h-1/2 px-20">
        {/* Header content goes here */}
      </div>
      <div className="overflow-y-auto px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <Card key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
