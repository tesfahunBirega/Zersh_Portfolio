import endebete from "../assets/company/1.png";
import endebetecomp from "../assets/tech/endebete.png";
import dashboard from "../assets/tech/dashboard.png";
import agency from "../assets/tech/agencyy.png";
import flutter from "../assets/tech/flutter.jpg";
import stockydashboard from "../assets//tech/stockydashboard.png";
import agriconnect from "../assets/tech/agriconnect.png";
import sd from "../assets/tech/sd.png";
import pm from "../assets/tech/pm2.png";
import dolchepay from "../assets/tech/dolchepay.png";
import modernweb from "../assets/tech/modernweb.png";
import bigo from "../assets/tech/bigo.png";
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  postgresql,
  stocky,
} from "../assets";
import moment from "moment";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "project",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Data Analyst",
    icon: web,
  },
  {
    title: "Business Intelligence Developer",
    icon: mobile,
  },
  {
    title: "Data Visualization Specialist",
    icon: backend,
  },
  {
    title: "Data Scientist",
    icon: backend,
  },
];

const skillsFrontend = [
  {
    title: "SQL (MySQL, PostgreSQL)",
    level: 95,
  },
  {
    title: "Python (Pandas, NumPy, Scikit-learn)",
    level: 90,
  },
  {
    title: "Excel & Spreadsheets",
    level: 85,
  },
  {
    title: "Tableau / Power BI",
    level: 90,
  },
  {
    title: "R (Data Analysis & Visualization)",
    level: 75,
  },
  {
    title: "Google Data Studio",
    level: 80,
  },
  {
    title: "Data Cleaning & Transformation",
    level: 95,
  },
];

const skillsBackend = [
  {
    title: "ETL Pipelines (Airflow, Talend)",
    level: 85,
  },
  {
    title: "Big Data Tools (Hadoop, Spark)",
    level: 75,
  },
  {
    title: "APIs & Data Integration",
    level: 80,
  },
  {
    title: "AWS (S3, Redshift, RDS)",
    level: 85,
  },
  {
    title: "NoSQL Databases (MongoDB, Cassandra)",
    level: 70,
  },
  {
    title: "Data Warehousing",
    level: 90,
  },
];

const skillsDevops = [
  {
    title: "Scikit-learn",
    level: 85,
  },
  {
    title: "TensorFlow / Keras",
    level: 75,
  },
  {
    title: "Natural Language Processing (NLP)",
    level: 80,
  },
  {
    title: "Regression & Classification Models",
    level: 90,
  },
  {
    title: "Model Deployment (Flask, FastAPI)",
    level: 80,
  },
  {
    title: "Data Preprocessing & Feature Engineering",
    level: 95,
  },
];

const technologies = [
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },

  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Postgresql",
    icon: postgresql,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];
const experiences = [
  {
    title: "Data Analytics Instructor & Mentor",
    company_name: "Masterschool | Upwork Freelance",
    icon: stocky,
    iconBg: "#383E56",
    date: `April 2024 - Present`,
    points: [
      "Taught 100+ students in data analytics courses, covering  spreadsheet techniques, SQL, Tableau, and Python.",
      "Mentored students on individual and group projects, providing personalized guidance that led to a 20% improvement in their analytical skills.",
      "Developed and updated curriculum content, hands-on projects, and assessments, resulting in a 15% increase in student engagement and course completion rates.",
    ],
  },
  {
    title: "Data Analyst & Scientist",
    company_name: "Berlin Bussiness aoutomation",
    icon: "https://www.digitalvidya.com/blog/wp-content/uploads/2019/07/How-To-Become-Data-Analyst-1170x630_db990027fe5f44bd66f9ec06f24f27c1.webp",
    iconBg: "#383E56",
    date: `Jan 2024 - May 2024`,
    points: [
      "Conducted market research and competitive analysis, contributing to a 10% increase in price prediction accuracy.",
      "Designed and maintained interactive dashboards in Tableau to track KPIs, improving business performance monitoring efficiency by 25%.",
      "Analyzed product price fluctuations, identifying trends that informed pricing strategies, leading to a 12% revenue increase.",
    ],
  },
  {
    title: "Data Analyst",
    company_name: "Endebete",
    icon: endebete,
    iconBg: "#E6DEDD",
    date: "Jan 2022 - May 2022",
    points: [
      "Analyzed real estate market trends and property data, optimizing pricing strategies, resulting in a 10% sales increase.",
      "Created and maintained Tableau dashboards for tracking sales performance and supporting strategic decision-making.",
      "Conducted data-driven research to refine property pricing, increasing profitability by 8%.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Stocky",
    description:
      "Developed 'Stocky,' a dynamic stock market analysis platform that utilizes data analysis techniques to provide trend analysis from both buyer and seller perspectives, leveraging user preferences and market data for valuable insights that inform decision-making.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
    ],
    image: stockydashboard,
    link: "https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Service Desc",
    description:
      "Created 'Service Desc,' a versatile CRM and ticket management tool designed for clients and registered company employees, streamlining communication and issue resolution to enhance overall customer satisfaction through effective data analysis.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: sd,
    link: "https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Project Management Tool",
    description:
      "Developed an intuitive project management tool that includes task assignment, progress tracking, and seamless communication features, significantly boosting team efficiency and project delivery through data-driven insights.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: pm,
    link: "https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Rigid Dashboard",
    description:
      "A comprehensive dashboard that visualizes transportation data, providing a convenient and efficient solution for transportation needs, emphasizing the role of data analysis in optimizing logistics.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "framer-motion",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: dashboard,
    link: "https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Dolche Pay",
    description:
      "'Dolche Pay' is an innovative finance platform that integrates credit scoring, peer-to-peer transactions, lending, and equity crowdfunding (Equb), empowering users to assess creditworthiness, facilitate transactions, and access credit in a unified platform, supported by robust data analysis.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwinds",
        color: "pink-text-gradient",
      },
    ],
    image: dolchepay,
    link: "https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/",
  },
  {
    name: "Dolche SaaS",
    description:
      "Created 'Dolche,' a SaaS fintech platform for comprehensive business finance management that offers income and expense tracking, invoicing, and data-driven insights to empower MSMEs and entrepreneurs through effective data analysis.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwinds",
        color: "pink-text-gradient",
      },
    ],
    image: agency,
    link: "https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/",
  },
  {
    name: "Bigo Game",
    description:
      "'Bigo' is an exciting virtual lottery and number-based game where customers can participate, guess the winning numbers, and earn money while having fun, offering an entertaining and rewarding gaming experience for players of all levels, leveraging data analysis to enhance user engagement.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwinds",
        color: "pink-text-gradient",
      },
    ],
    image: bigo,
    link: "https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/nand-n/Agency-website.git",
  },
  {
    name: "Modern Web 3",
    description:
      "A fully responsive, visually appealing, and beautifully interactive Web 3-like landing page, showcasing the power of data visualization and user interaction.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwinds",
        color: "pink-text-gradient",
      },
    ],
    image: modernweb,
    link: "https://modern-web.onrender.com/",
    source_code_link: "https://github.com/",
  },
  {
    name: "Agency Landing Page",
    description:
      "An Agency Landing page that features a dashboard, allowing users to view estimated salary ranges for positions and locate available jobs based on their current location, employing data analysis to improve user experience.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwinds",
        color: "pink-text-gradient",
      },
    ],
    image: agency,
    link: "https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/nand-n/Agency-website.git",
  },
  {
    name: "Endebete",
    description:
      "A home rental company dashboard that allows users to view estimated salary ranges for positions and locate available jobs based on their current location, utilizing data analytics to enhance decision-making for users.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwinds",
        color: "pink-text-gradient",
      },
    ],
    image: endebetecomp,
    link: "https://endebete.com/",
    source_code_link: "https://github.com/nand-n/endebete",
  },
  {
    name: "Agri-Connect",
    description:
      "A company landing page for agri-tech that features a dashboard, allowing users to view estimated salary ranges for positions and locate available jobs based on their current location, supported by data analysis for improved functionality.",
    tags: [
      {
        name: "react.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwinds",
        color: "pink-text-gradient",
      },
    ],
    image: agriconnect,
    link: "https://adis-gebrena.onrender.com/",
    source_code_link: "https://github.com/nand-n/adis-gibrena",
  },
];

// const baseUrl = import.meta.env.ENV =="development" ? import.meta.env.BASE_URL_DEV : import.meta.env.BASE_URL_PROD
const baseUrl = "https://nahom-back.onrender.com/api/v1/";
// const baseUrl = "http://localhost:3000/api/v1/"

const imgBaseUrl = "https://nahom-back.onrender.com";

const carouselItemsBlogs = [
  {
    id: 1,
    title: "Discover Our Latest Blogs",
    description: "Explore our collection of insightful articles.",
  },
  {
    id: 2,
    title: "Stay Informed with our Expert Writers",
    description: "Get the latest trends and updates in the industry.",
  },
  {
    id: 3,
    title: "Join Our Community of Bloggers",
    description: "Share your knowledge and experiences with others.",
  },
];

const exploreBlogsTags = [
  {
    tag: "Technology",
    color: "blue",
  },
  {
    tag: "Lifestyle",
    color: "green",
  },
  {
    tag: "Coffee",
    color: "orange",
  },
];

import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { FileTextOutlined } from "@ant-design/icons";
import { ReadOutlined } from "@ant-design/icons";
import { ProjectOutlined } from "@ant-design/icons";
import { FileDoneOutlined } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";
import { FcDocument } from "react-icons/fc";
import { AiFillInsurance } from "react-icons/ai";
import { IoDocumentLockSharp } from "react-icons/io5";
const sidebarRoutes = [
  {
    name: "Reports",
    to: "reports",
    icon: <FileDoneOutlined />,
  },
  {
    name: "Goal",
    to: "goal",
    icon: <FundProjectionScreenOutlined />,
  },
  {
    name: "Task",
    to: "task",
    icon: <FundProjectionScreenOutlined />,
  },
  {
    name: "Notes",
    to: "notes",
    icon: <FileTextOutlined />,
  },
  {
    name: "Blogs",
    to: "blogs",
    icon: <ReadOutlined />,
  },
  {
    name: "Projects",
    to: "projects",
    icon: <ProjectOutlined />,
  },
  {
    name: "Finance",
    to: "finance",
    icon: <AiFillInsurance />,
  },
  {
    name: "Docs",
    to: "docs",
    icon: <IoDocumentLockSharp />,
  },

  {
    name: "Settings",
    to: "settings",
    icon: <SettingOutlined />,
  },
];

const getRandomColor = () => {
  const colors = [
    "blue-text-gradient",
    "green-text-gradient",
    "pink-text-gradient",
    "red-text-gradient",
    "yellow-text-gradient",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export {
  services,
  sidebarRoutes,
  technologies,
  experiences,
  testimonials,
  projects,
  skillsFrontend,
  skillsBackend,
  skillsDevops,
  baseUrl,
  imgBaseUrl,
  carouselItemsBlogs,
  exploreBlogsTags,
  getRandomColor,
};
