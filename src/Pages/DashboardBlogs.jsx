import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchBlogs } from "../store/blog/blogAction";
import Dashboard from "../commons/Dashboard";
import { connect } from "react-redux";
import { Pagination } from "antd";

function DashboardBlogs({ blogs, fetchBlogs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <div className="overflow-y-auto px-20">
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
          className="mt-4"
          current={currentPage}
          total={blogs.length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </Dashboard>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBlogs);
