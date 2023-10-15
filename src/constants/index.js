import endebete from '../assets/company/1.png'
import dashboard from '../assets/tech/dashboard.png'
import agency from '../assets/tech/agencyy.png'
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
  stocky
} from "../assets";
import moment from 'moment';

export const navLinks = [
  {
    id: "about",
    title: "About",
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
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Mobile Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI/UX",
    icon: backend,
  },
 
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
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
    title: "Upwork Freelance",
    company_name: "Stocky | Upwork Freelance",
    icon: stocky,
    iconBg: "#383E56",
    date: `10 2023 -  ${ moment("10-10-2023").format("MM-YYYY")}`,
    points: [
      "Creating a Company Landing Page and dashboard to validate , analysis the cusotmers interaction using React , express.js , JavaScript library and the Tailwind CSS framework involves utilizing these tools to develop user-friendly, visually appealing, and highly functional applications",
      "Collaborating with the CEO of Stocky , to create high-quality products.",
    ],
  },
  {
    title: "Full-stack Developer",
    company_name: "IE Network Solutions",
    icon: "https://scm.ienetworks.co/static/media/White.c831409c3eec4e852dfb.png",
    iconBg: "#383E56",
    date: `02 2023 -  ${ moment(Date.now()).format("MM-YYYY")}`,
    points: [
      "Creating software as a service (SaaS) products using the React , express.js , JavaScript library and the Tailwind CSS framework involves utilizing these tools to develop user-friendly, visually appealing, and highly functional applications",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Flutter Mobile Developer",
    company_name: "Endebete",
    icon: endebete,
    iconBg: "#E6DEDD",
    date: "Jan 2022 - May 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
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
    name: "Rigid Dashboard",
    description:
      "A Comprehancive dashboard to vishalize and  a convenient and efficient solution for transportation needs.",
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
        name: "syncfusion",
        color: "yellow-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: dashboard,
    link:"https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Agency Landing page",
    description:
      "Agency Landing page for , dashboard , view estimated salary ranges for positions, and locate available jobs based on their current location.",
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
    link:"https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/",
  },
  {
    name: "Agency Landing page",
    description:
      "Agency Landing page for , dashboard , view estimated salary ranges for positions, and locate available jobs based on their current location.",
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
    image: jobit,
    link:"https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/",
  },
  {
    name: "Agency Landing page",
    description:
      "Agency Landing page for , dashboard , view estimated salary ranges for positions, and locate available jobs based on their current location.",
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
    image: jobit,
    link:"https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/nand-n/Agency-website.git",
  },
  {
    name: "Agri-Connect",
    description:
      "A Company Landing page for agri tech ,dashboard , view estimated salary ranges for positions, and locate available jobs based on their current location.",
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
    image: jobit,
    link:"https://adis-gebrena.onrender.com/",
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
