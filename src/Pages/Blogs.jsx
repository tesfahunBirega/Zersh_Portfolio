import React, { useEffect } from "react";
import Card from "../components/Card";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/blog/blogAction";

function Blogs({ blogs, fetchBlogs }) {
  // const dispatch = useDispatch();
  // const blogs = useSelector((state) => state.blogs.blogs);
  useEffect(() => {
    fetchBlogs();
  }, []);
  console.log(blogs, "blog");

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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogs: () => dispatch(fetchBlogs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
