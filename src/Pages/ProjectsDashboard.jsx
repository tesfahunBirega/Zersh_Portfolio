import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Popconfirm, Upload, message } from "antd";
import { connect } from "react-redux";
import Dashboard from "../commons/Dashboard";
import { createProject, deleteProject, fetchProjects, updateProject } from "../store/project/projectAction";
import ProjectForm from "../components/Project/ProjectForm";
import Works, { ProjectCard, ProjectCardDashboard } from "../components/Works";

function DashboardProjects({ projects, fetchProjects, createProject, deleteProject, updateProject, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    topics: [],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = projects?.length > 0 && projects?.slice(startIndex, endIndex);

  const handleEditModalOk = () => {
    updateProject(selectedProject._id, formData);
    setIsEditModalVisible(false);
  };

  const handleDelete = (projectId) => {
    deleteProject(projectId);
  };

  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <div className="overflow-y-auto px-20">
          <div className=" flex justify-between items-center mb-10 ">
            <div className="text-4xl font-sans font-bold">Projects</div>
            <Button
              className={"text-white"}
              onClick={() => {
                setIsCreateModalVisible(true);
              }}
            >
              Add Project
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentProjects.length >= 1 ? (
              currentProjects.map((project, index) => (
                <React.Fragment key={index}>
                  <div className="grid items-center ">
                    <ProjectCardDashboard {...project } 
                     setIsEditModalVisible={setIsEditModalVisible}
                      setSelectedProject ={setSelectedProject}  setFormData={setFormData}  handleDelete={handleDelete}
                    />
                   
                  </div>
                </React.Fragment>
              ))
            
            ) : (
              <div className="col-span-3 font-sans items-center max-w-6xl mx-auto my-12 px-36 py-12 bg-tertiary text-white shadow-md rounded-md transition-colors duration-500">
                There are no projects posted!
              </div>
            )}
          </div>
        </div>

        <Pagination
          className="mt-4 mx-20"
          current={currentPage}
          total={projects?.length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>

      <ProjectForm
      onCancel={()=>{}}
        visible={isCreateModalVisible}
        setVisible={setIsCreateModalVisible}
        loading={loading}
        onSubmit={createProject}
        formData={formData}
        setFormData={setFormData}
      />

      <ProjectForm
        visible={isEditModalVisible}
        setVisible={setIsEditModalVisible}
        loading={loading}
        onSubmit={handleEditModalOk}
        formData={formData}
        setFormData={setFormData}
      />
    </Dashboard>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects
    ,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
    createProject: (projectData) => dispatch(createProject(projectData)),
    updateProject: (projectId, projectData) => dispatch(updateProject(projectId, projectData)),
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProjects);
