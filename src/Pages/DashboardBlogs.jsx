import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { createBlog, deleteBlog, fetchBlogs, updateBlog } from "../store/blog/blogAction";
import Dashboard from "../commons/Dashboard";
import { connect } from "react-redux";
import {
  Button,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import UpdateForm from "../components/Forms/UpdateForm";
import UpdateBlogModal from "../components/Forms/UpdateForm";
import CreateBlogModal from "../components/Forms/CreateForm";

function DashboardBlogs({
  blogs,
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  loading,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    description: "",
    body: "",
    category: "",
    image: null,
  });

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBlogs = blogs.length > 0 && blogs.slice(startIndex, endIndex);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateModalOk = () => {
    createBlog(formData);
    setIsCreateModalVisible(false);
  };

  // const handleEditModalOk = (updatedBlogData) => {
  //   // updateBlog(selectedBlog.id, updatedBlogData);
  //   setIsEditModalVisible(false);
  // };

  const handleDelete = (blogId) => {
    deleteBlog(blogId);
  };

  console.log(blogs, "blogs");
  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <div className="overflow-y-auto px-20">
          <div className=" flex justify-between items-center mb-10 ">
            <div className="text-4xl font-sans font-bold">Blogs </div>
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

                      <Popconfirm
                        title="Are you sure you want to delete this blog?"
                        onConfirm={() => handleDelete(blog._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button className="text-white">Delete</Button>
                      </Popconfirm>
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
      <CreateBlogModal
        setVisible={setIsCreateModalVisible}
        loading={loading}
        onCancel={() => setIsCreateModalVisible(false)}
        onCreate={createBlog}
        visible={isCreateModalVisible}
      />

  
       <UpdateBlogModal
        blog={selectedBlog}
        visible={isEditModalVisible}
        onUpdate={updateBlog}
        onCancel={() => setIsEditModalVisible(false)}
        loading={loading}
        setVisible={setIsEditModalVisible}
      />
    </Dashboard>
  );
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs,
    loading: state.blogs.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogs: () => dispatch(fetchBlogs()),
    createBlog: (blogData) => dispatch(createBlog(blogData)),
    updateBlog: (data) => dispatch(updateBlog(data)),
    deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBlogs);
