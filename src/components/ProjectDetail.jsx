import { motion } from "framer-motion";

const ProjectDetailPage = () => {
  const projectTitle = "Project Name";
  const projectDescription = "Detailed project description goes here.";
  const uiDesigns = [
    { link: "https://figma.com/design1" },
    { link: "https://figma.com/design2" },
  ];
  const userJourneyMaps = [
    { link: "https://journeymap1.com" },
    { link: "https://journeymap2.com" },
  ];

  return (
    <div>
      <ProjectDetail
        title={projectTitle}
        description={projectDescription}
        uiDesigns={uiDesigns}
        userJourneyMaps={userJourneyMaps}
      />
    </div>
  );
};

export default ProjectDetailPage;

const ProjectDetail = ({ title, description, uiDesigns, userJourneyMaps }) => {
  return (
    <div className="flex flex-col md:flex-row md:grid md:grid-cols-2 md:justify-evenly gap-4 md:gap-8 mt-8">
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-gray-600 mt-4">{description}</p>
      </div>
      <div className="md:col-span-1">
        <h3 className="text-2xl font-bold mt-4">UI Designs</h3>
        {uiDesigns.map((design, index) => (
          <div key={index} className="mt-4">
            <img
              src={design.imageSrc}
              alt={`UI Design ${index + 1}`}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <div className="md:col-span-1">
        <h3 className="text-2xl font-bold mt-4">User Journey Maps</h3>
        {userJourneyMaps.map((journey, index) => (
          <div key={index} className="mt-4">
            <img
              src={journey.imageSrc}
              alt={`User Journey Map ${index + 1}`}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
