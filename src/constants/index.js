import endebete from '../assets/company/1.png'
import endebetecomp from '../assets/tech/endebete.png'
import dashboard from '../assets/tech/dashboard.png'
import agency from '../assets/tech/agencyy.png'
import flutter from '../assets/tech/flutter.jpg'
import stockydashboard from '../assets//tech/stockydashboard.png'
import agriconnect from '../assets/tech/agriconnect.png'
import sd from '../assets/tech/sd.png'
import pm from '../assets/tech/pm2.png'
import dolchepay from '../assets/tech/dolchepay.png'
import modernweb from '../assets/tech/modernweb.png'
import bigo from '../assets/tech/bigo.png'
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

const skillsFrontend = [
  {
    title: "React.js | Redux , Redux Thunk",
    level: 95,
  },
  {
    title: "Next.js",
    level: 80,
  },
  {
    title: "Flutter",
    level: 70,
  },
  {
    title: "Three.js / React Three Fiber",
    level: 40,
  },
  {
    title: "Tailwind , CSS",
    level: 90,
  },
  {
    title: "Framer-motion",
    level: 80,
  },
  {
    title: "Figma",
    level: 70,
  },
];
const skillsBackend = [
  {
    title: "Express.js",
    level: 90,
  },
  {
    title: "Next.js",
    level: 70,
  },
  {
    title: "TypeORM",
    level: 95,
  },
  {
    title: "Prisma",
    level: 95,
  },
  {
    title: "Postgresql",
    level: 80,
  },
  {
    title: "Mongodb",
    level: 75,
  }
];
const skillsDevops = [
  {
    title: "Docker",
    level: 90,
  },
  {
    title: "Nginx",
    level: 70,
  },
  {
    title: "Jenkinks",
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
    name: "Stocky",
    description:
      "Developed 'Stocky,' a dynamic stock market analysis platform. It offers trend analysis for products from both buyer and seller perspectives, utilizing user preferences and market data to provide valuable insights for informed decision-making.",
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
    link:"https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Service Desc ",
    description:
      "Created 'SD,' a versatile CRM and ticket management tool for clients and registered company employees. It streamlines communication and issue resolution, enhancing overall customer satisfaction.",
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
    link:"https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Project Management tool ",
    description:
      "Developed an intuitive project management tool with task assignment, progress tracking, and seamless communication features, boosting team efficiency and project delivery..",
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
    link:"https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
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
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: dashboard,
    link:"https://dashboard-nk3k.onrender.com",
    source_code_link: "https://github.com/nand-n/Dashboard_1.0",
  },
  {
    name: "Dolche Pay",
    description:
      "'Dolche Pay,' an innovative finance platform that integrates credit scoring, peer-to-peer transactions, lending, and equity crowdfunding (Equb). It empowers users to assess creditworthiness, facilitate transactions, access credit, unified platform. ",
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
    link:"https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/",
  },
  {
    name: "Dolche SaaS",
    description:
      "Created 'Dolche,'a SaaS fintech platform for comprehensive business finance management, offering income and expense tracking, invoicing, and data-driven insights to empower MSMEs and entrepreneurs.",
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
    name: "Bigo game",
    description:
      " Bigo an exciting virtual lottery and number-based game. Customers can participate, guess the winning numbers, and have the chance to earn money while having fun. Bigo offers an entertaining and rewarding gaming experience for players of all levels.",
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
    link:"https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/nand-n/Agency-website.git",
  },
  {
    name: "Modern web 3",
    description:
      "A fully responseive visually apeal and beautiful interactive , web 3 like lading page.",
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
    link:"https://modern-web.onrender.com/",
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
    image: agency,
    link:"https://agency-landing-page.onrender.com/",
    source_code_link: "https://github.com/nand-n/Agency-website.git",
  },
  {
    name: "Endebete",
    description:
      "A Home Rental Companyt for retail based company,dashboard,view estimated salary ranges for positions, and locate available jobs based on their current location.",
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
    link:"https://endebete.com/",
    source_code_link: "https://github.com/nand-n/endebete",
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
    image: agriconnect,
    link:"https://adis-gebrena.onrender.com/",
    source_code_link: "https://github.com/nand-n/adis-gibrena",
  },
  
];

const baseUrl = "http://localhost:3000/api/v1/"

const sidebarRoutes =[
  {
name:"Reports",
  to:'',
  icon:"->"
},
{
  name:"Okr",
    to:'okr',
    icon:"->"
  },
  {
    name:"Notes",
      to:'notes',
      icon:"->"
    },
{
  name:"Blogs",
  to:'blogs',
  icon:"->"
}
]

export { services,sidebarRoutes, technologies, experiences, testimonials, projects ,skillsFrontend,
  skillsBackend,
  skillsDevops,baseUrl };



