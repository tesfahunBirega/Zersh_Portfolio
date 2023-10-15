import Tilt from "react-tilt";
import { motion, useAnimation } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  link,
}) => {
  const controls = useAnimation();
  const bounceAnimation = {
    z: [0, -20, 0, 20, 0],
    scale: [1, 0.8, 1, 1.2, 1], // Scaling animation for forward and backward bounces
    transition: {
      duration: 0.8,
      repeat: Infinity,
    },
  };

  useEffect(() => {
    // Start the bouncing animation when the component mounts
    controls.start(bounceAnimation);
  }, [controls]);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full mb-8 md:col-span "
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
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
            to={`/projectdetail/${name.split(" ")[0]}`}
            className="text-white font-bold text-[24px]  hover:text-indigo-500 "
          >
            {name}
          </Link>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            animate={controls}
            onClick={() => window.open(link, "_blank")}
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
