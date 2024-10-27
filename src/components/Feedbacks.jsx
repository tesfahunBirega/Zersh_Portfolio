import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { ProjectCard } from "./Works";

const Feedbacks = () => {
  const projects = [
    {
      _id: "667130d12a84ec7e25768990",
      title: "Data Analytics Instructor & Mentor",
      description:
        "Project Overview: The Supply Chain Management (SCM) System is a comprehensive solution designed to optimize and streamline supply chain operations.",
      imageUrl:
        "https://res.cloudinary.com/div5amfk9/image/upload/v1718693885/g5pvqhfde9l3uhzn6bl3.png",
      projectLink: "https://github.com",
      gitHubLink: "https://github.com",
    },
    {
      _id: "6671202932002cb02751648a",
      title: "Data Analytics Instructor & Mentor",
      description:
        "This advanced e-commerce dashboard provides a comprehensive view of key business metrics, designed to help businesses make data-driven decisions.",
      imageUrl:
        "https://res.cloudinary.com/div5amfk9/image/upload/v1718689491/goi7to0fkb71hee56q7m.png",
      projectLink: "https://github.com/nand-n",
      gitHubLink: "https://github.com/nand-n",
    },
    {
      _id: "667130d12a84ec7e25768990",
      title: "Data Analytics Instructor & Mentor",
      description:
        "Project Overview: The Supply Chain Management (SCM) System is a comprehensive solution designed to optimize and streamline supply chain operations.",
      imageUrl:
        "https://res.cloudinary.com/div5amfk9/image/upload/v1718693885/g5pvqhfde9l3uhzn6bl3.png",
      projectLink: "https://github.com",
      gitHubLink: "https://github.com",
    },
    {
      _id: "667130d12a84ec7e25768990",
      title: "Data Analytics Instructor & Mentor",
      description:
        "Project Overview: The Supply Chain Management (SCM) System is a comprehensive solution designed to optimize and streamline supply chain operations.",
      imageUrl:
        "https://res.cloudinary.com/div5amfk9/image/upload/v1718693885/g5pvqhfde9l3uhzn6bl3.png",
      projectLink: "https://github.com",
      gitHubLink: "https://github.com",
    },
    {
      _id: "667130d12a84ec7e25768990",
      title: "Data Analytics Instructor & Mentor",
      description:
        "Project Overview: The Supply Chain Management (SCM) System is a comprehensive solution designed to optimize and streamline supply chain operations.",
      imageUrl:
        "https://res.cloudinary.com/div5amfk9/image/upload/v1718693885/g5pvqhfde9l3uhzn6bl3.png",
      projectLink: "https://github.com",
      gitHubLink: "https://github.com",
    },
    // Add more project objects as needed
  ];

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]" id="project">
      <div
        className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Projects</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>
        <div className="w-full flex" id="project">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            These projects showcase my skills and experience in data analysis
            through real-world applications.
          </motion.p>
        </div>
      </div>
      <div
        className={`${styles.paddingX} -mt-20 pb-14 grid-flow-row px-8 md:flex md:flex-cols-4 overflow-x-scroll md:px-12 py-4 gap-7`}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project._id} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
