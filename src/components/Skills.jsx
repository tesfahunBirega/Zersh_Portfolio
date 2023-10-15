import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { skillsBackend, skillsFrontend, skillsDevops } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Skills = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Skills</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="w-full flex " id="skills">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          The following skills showcases my skills & expertise.
        </motion.p>
      </div>
      <div className="grid grid-col justify-evenly items-start  gap-8 mt-8">
        <motion.div whileInView={"visible"} className="col-span-1 col-start-1 ">
          <h2 className="text-3xl font-bold">Frontend Skills </h2>
          <div className="mt-8 space-y-4">
            {skillsFrontend.map((skill, index) => (
              <div key={index} className="w-64">
                <motion.h3
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                  className="text-xl font-bold text-gray-100"
                >
                  {skill.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div whileInView={"visible"} className="col-span-1 col-start-2">
          <h2 className="text-3xl font-bold">Backend Skills </h2>
          <div className="mt-8 space-y-4">
            {skillsBackend.map((skill, index) => (
              <div key={index} className="w-64">
                <motion.h3
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                  className="text-xl font-bold text-gray-100"
                >
                  {skill.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div whileInView={"visible"} className="col-span-1 col-start-3">
          <h2 className="text-3xl font-bold">DevOps Skills </h2>
          <div className="mt-8 space-y-4">
            {skillsDevops.map((skill, index) => (
              <div key={index} className="w-64">
                <motion.h3
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                  className="text-xl font-bold text-gray-100"
                >
                  {skill.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Skills, "");
