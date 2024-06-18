import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { StarsCanvas } from "./canvas";
import Navbar from "./Navbar";
import { fetchProject } from "../store/project/projectAction";
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectDetail = ({ title, description, imageUrl, videoUrl, topics, projectLink, gitHubLink, descImageUrl1, descImageUrl2  ,description1,
  description2}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6"
    >
      <div className="bg-transparent shadow-white-100 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>

          {imageUrl && (
            <div className="mb-6">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={imageUrl}
                alt={title}
                className="w-full h-auto rounded-md shadow-md"
              />
            </div>
          )}

          {videoUrl && (
            <div className="mb-6">
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                controls
                className="w-full h-auto rounded-md shadow-md"
              >
                <source src={videoUrl} type="video/mp4" />
              </motion.video>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Topics</h3>
            <ul className="list-disc list-inside">
              {topics?.map((topic) => (
                <li key={topic._id} className={`text-${topic.color}`}>
                  {topic.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">{description}</div>
          <div className="grid gap-4 space-y-8">
  <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
    <div className="description mb-2 md:mb-0 md:mr-2 md:w-1/2">
      <p>{description1}</p>
    </div>
    <div className="image md:w-1/2 md:mr-4 mb-4 md:mb-0">
      <img src={descImageUrl1} alt="Description Image 1" className="max-w-full h-auto rounded-lg" />
    </div>
  </div>
  <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
    <div className="image md:w-1/2 md:mr-4 mb-4 md:mb-0">
      <img src={descImageUrl2} alt="Description Image 2" className="max-w-full h-auto rounded-lg" />
    </div>
    <div className="description mb-2 md:mb-0 md:mr-2 md:w-1/2">
      <p>{description2}</p>
    </div>
  </div>
</div>


          <div className="mb-6 mt-8 space-y-4">
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-xl flex items-center"
            >
              <FaExternalLinkAlt className="mr-2" />
              Project Link
            </a>
            <a
              href={gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-xl flex items-center"
            >
              <FaGithub className="mr-2" />
              GitHub Link
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetailPage = ({ project, loading, fetchProject }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchProject(id);
  }, [fetchProject, id]);

  if (loading || !project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar project />
        <StarsCanvas />
        <div className="mt-0 pt-28 px-4 sm:px-8 md:px-32">
          <ProjectDetail
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            videoUrl={project.videoUrl}
            topics={project.topics}
            projectLink={project.projectLink}
            descImageUrl1={project.descImageUrl1}
            descImageUrl2={project.descImageUrl2}
            gitHubLink={project.gitHubLink}
            description1={project?.description1}
            description2={project?.description2}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.project.project,
    loading: state.project.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailPage);
