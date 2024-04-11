import Tilt from "react-tilt";
import { motion, useAnimation } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, GithubOutlined } from "@ant-design/icons";

export const ProjectCard = ({
  _id,
  index,
  title,
  description,
  topics,
  imageUrl,
  gitHubLink,
  projectLink,

}) => {
  const controls = useAnimation();
  const bounceAnimation = {
    z: [0, -20, 0, 20, 0],
    scale: [1, 0.8, 1, 1.2, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
    },
  };

  useEffect(() => {
    controls.start(bounceAnimation);
  }, [controls]);


  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className={` bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full mb-8 md:col-span `}
      >
        <div className="relative w-full h-[230px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(gitHubLink, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Link
            to={`/projectdetail/${_id}`}
            className="text-white font-bold text-[24px]  hover:text-indigo-500 "
          >
            {title}
          </Link>
          <p className="mt-2 text-secondary text-[14px]">{description?.split(' ')?.slice(0, 25).join(' ') + '...'}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-4 flex flex-wrap gap-2">
            {topics?.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
          {projectLink != null && projectLink?.length >=1 && 
           <motion.div
            whileTap={{ scale: 0.9 }}
            animate={controls}
            onClick={() => window.open(projectLink, "_blank")}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-sky-800 border-b-[10px] border-b-transparent"></div>
          </motion.div>
          }
         
        </div>
      </Tilt>
    </motion.div>
  );
};

export const ProjectCardDashboard = ({
  _id,
  index,
  title,
  description,
  topics,
  imageUrl,
  gitHubLink,
  projectLink,
  handleDelete,
  setSelectedProject,
  setFormData,
  setIsEditModalVisible,
}) => {
  const controls = useAnimation();
  const bounceAnimation = {
    z: [0, -20, 0, 20, 0],
    scale: [1, 0.8, 1, 1.2, 1], 
    transition: {
      duration: 0.8,
      repeat: Infinity,
    },
  };

  useEffect(() => {
    controls.start(bounceAnimation);
  }, [controls]);


  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className={` bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full mb-8 md:col-span `}
      >
        <div className="relative w-full h-[230px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(gitHubLink, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 m-3">
            <div className="flex gap-2">
              <Button
                className="text-white"
                onClick={() => {
                  setIsEditModalVisible(true);
                  setSelectedProject({
                    _id,
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    topics: topics,
                  });
                  setFormData({
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    topics: topics,
                  });
                }}
                icon={<EditOutlined />}
              />
              <Popconfirm
                title="Are you sure you want to delete this project?"
                onConfirm={() => handleDelete(_id)}
                okText="Yes"
                okButtonProps={{
                  className:"bg-blue-500"
                }}
                cancelText="No"
              >
                <Button className="text-white" icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          </div>
        </div>
        
        
        <div className="mt-5">
          <Link
            to={`/projectdetail/${_id}`}
            className="text-white font-bold text-[24px]  hover:text-indigo-500 "
          >
            {title}
          </Link>
          <p className="mt-2 text-secondary text-[14px]">{description?.split(' ')?.slice(0, 25).join(' ') + '...'}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-4 flex flex-wrap gap-2">
            {topics?.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            animate={controls}
            onClick={() => window.open(projectLink, "_blank")}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-sky-800 border-b-[10px] border-b-transparent"></div>
          </motion.div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex " id="project">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world work experiance. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex justify-start overflow-x-scroll  gap-4 px-4 py-4 ">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
