import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchBlogs } from "../store/blog/blogAction";
import Dashboard from "../commons/Dashboard";
import { connect } from "react-redux";
import { Button, Modal, Pagination } from "antd";

function DashboardBlogs({ blogs, fetchBlogs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateModalOk = () => {
    // Add logic to create a new blog
    // Call createBlog action
    // createBlog(newBlogData);
    setIsCreateModalVisible(false);
  };

  const handleEditModalOk = () => {
    // Add logic to update the selected blog
    // Call updateBlog action
    // updateBlog(selectedBlog.id, updatedBlogData);
    setIsEditModalVisible(false);
  };

  const handleDelete = (blogId) => {
    // Add logic to delete the selected blog
    // Call deleteBlog action
    // deleteBlog(blogId);
  };

  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <div className="overflow-y-auto px-20">
          <div className=" flex justify-between items-center mb-10 ">
            <div className="text-4xl font-sans font-bold">Create Blog</div>
            <Button
              className={"text-white"}
              onClick={() => {
                setIsCreateModalVisible(true);
              }}
            >
              Add Blog
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentBlogs.length >= 1 ? (
              currentBlogs?.map((blog, index) => (
                <React.Fragment key={index}>
                  <div className="grid items-center ">
                    <Card {...blog} />
                    <div className="flex bg-tertiary rounded-lg">
                      <Button
                        className={"text-white"}
                        onClick={() => {
                          setIsEditModalVisible(true);
                          setSelectedBlog(blog);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className={"text-white"}
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              ))
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
      <Modal
        title="Create Blog"
        open={isCreateModalVisible}
        onOk={handleCreateModalOk}
        onCancel={() => setIsCreateModalVisible(false)}
      >
        {/* Add form fields for creating a new blog */}
      </Modal>

      <Modal
        title="Edit Blog"
        open={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={() => setIsEditModalVisible(false)}
      >
        {/* Add form fields for editing the selected blog */}
      </Modal>
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
    createBlog: (blogData) => dispatch(createBlog(blogData)),
    updateBlog: (blogId, blogData) => dispatch(updateBlog(blogId, blogData)),
    deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBlogs);
