import React from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";

function Blogs() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  console.log(blogs, "blog");
  const blogData = [
    {
      id: "1",
      author: "Author 1",
      title: "Blog 1",
      description:
        "This is the first blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://placekitten.com/400/300",
      body: "bodybod",
      category: "Technology",
      createdDate: "January 10, 2022",
    },
    {
      id: "2",
      author: "Author 1",
      title: "Blog 2",
      description:
        "This is the second blog post. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      body: "bodybod",

      imageUrl: "https://placekitten.com/401/300",
      category: "Travel",
      createdDate: "February 15, 2022",
    },
  ];
  return (
    <div className="relative z-0 bg-primary h-screen overflow-y-scroll scroll-smooth">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center h-1/2 px-20">
        {/* Header content goes here */}
      </div>
      <div className="overflow-y-auto px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.length >= 1 ? (
            blogs?.map((blog, index) => <Card key={index} {...blog} />)
          ) : (
            <div className="col-span-3 font-sans items-center max-w-6xl mx-auto my-12 px-36 py-12 bg-tertiary text-white shadow-md rounded-md transition-colors duration-500">
              Ther is no any blog posted!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
