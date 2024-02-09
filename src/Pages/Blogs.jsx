import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/blog/blogAction";
import { Navbar } from "../components";
import { Carousel, Pagination, Tag } from "antd";
import RandomColorCard from "../components/Commons/RandomColorCard";
import { carouselItemsBlogs, exploreBlogsTags } from "../constants";

function Blogs({ blogs, fetchBlogs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBlogs = blogs.length > 0 && blogs.slice(startIndex, endIndex);
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="relative z-0 bg-primary h-screen overflow-y-scroll scroll-smooth">
      <Navbar />

      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center h-1/2 px-20">
        <div className="mt-28 h-full mb-4 bg-transparent text-white py-8 px-4">
          <Carousel autoplay dots={false}>
            {carouselItemsBlogs.map((item) => (
              <div className="text-white" key={item.id}>
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <p className="text-lg">{item.description}</p>
              </div>
            ))}
          </Carousel>
          <div className="mt-4">
            <p className="text-lg">Explore {blogs?.length} Blogs</p>
            {exploreBlogsTags?.map((item, index) => (
              <div key={index}>
                <Tag color={item.color} className="mr-2">
                  {item.tag}
                </Tag>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-y-auto mt-8 px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentBlogs.length >= 1 ? (
            currentBlogs?.map((blog, index) => <Card key={index} {...blog} />)
          ) : (
            <div className="col-span-3 font-sans items-center max-w-6xl mx-auto my-12 px-36 py-12 bg-tertiary text-white shadow-md rounded-md transition-colors duration-500">
              Ther is no any blog posted!
            </div>
          )}
        </div>
      </div>
      <Pagination
        className="mt-4 mx-20"
        current={currentPage}
        total={blogs.length}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogs: () => dispatch(fetchBlogs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
