import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { createBlog, deleteBlog, fetchBlogs } from "../store/blog/blogAction";
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

function DashboardBlogs({ blogs, fetchBlogs, createBlog, deleteBlog }) {
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

  const handleEditModalOk = () => {
    updateBlog(selectedBlog.id, updatedBlogData);
    setIsEditModalVisible(false);
  };

  const handleDelete = (blogId) => {
    deleteBlog(blogId);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setFormData({ ...formData, image: info.file });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
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
                      {/* <Button
                        className={"text-white"}
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </Button> */}
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
      <Modal
        title="Create Blog"
        open={isCreateModalVisible}
        onOk={handleCreateModalOk}
        onCancel={() => setIsCreateModalVisible(false)}
      >
        <div>
          <label htmlFor="author">Author:</label>
          <Input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <TextArea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <Input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <Upload
            name="image"
            accept="image/*"
            customRequest={handleImageUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>
      </Modal>

      <Modal
        title="Edit Blog"
        open={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <div>
          <label htmlFor="author">Author:</label>
          <Input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <TextArea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <Input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <Upload
            name="image"
            accept="image/*"
            customRequest={handleImageUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>
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
