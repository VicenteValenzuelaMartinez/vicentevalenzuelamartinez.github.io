import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import images from "../json/component/projectImages.json" with { type: "json" };
import techData from "../json/component/technologies.json" with { type: "json" };
interface ProjectCardProps {
  projectKey: string;
}

type Technology = {
  name: string;
  logo: string;
  website: string;
};

type TechnologiesJSON = {
  Technologies: Record<string, Technology>;
};

const typedImages = images as Record<string, string[]>;
const techInfo = techData as TechnologiesJSON;

const ProjectCard = ({ projectKey }: ProjectCardProps) => {
  const { t } = useTranslation();
  const project = t(`Home.Projects.${projectKey}`, { returnObjects: true }) as {
    Title: string;
    About: string;
    "Technologies used": Record<string, string>;
  };
  const techList = Object.values(project["Technologies used"]);

  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  const imagePaths = (typedImages[projectKey] || []).map(
    (filename: string) => `/projects/${projectKey}/${filename}`
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % imagePaths.length);
        setFade(true);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, [imagePaths.length]);

  return (
    <div className="flex flex-col gap-4 md:p-4 p-1 bg-zinc-700 rounded-xl shadow">
      <div className="flex flex-col lg:flex-row md:gap-4 gap-1">
        <div className="flex-1 p-5 bg-zinc-900 rounded-xl">
          <h3 className="text-2xl font-bold">{project.Title}</h3>
          <p className="text-xl mt-2 text-gray-100 md:text-justify">{project.About}</p>
        </div>
            {imagePaths.length>0?
        <div className="flex-1 relative overflow-hidden rounded-lg bg-zinc-900 p-5 h-100">
          <img
            key={currentImage}
            src={imagePaths[currentImage]}
            alt=""
            className={`w-full h-full object-cover transition-opacity duration-2000 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
            :""}
      </div>
            <div className="text-2xl flex flex-wrap justify-start">
        {t("Home.TecUsed")}
      </div>
      <div className="flex flex-wrap justify-start gap-10 md:p-7 p-5 bg-zinc-900">
        {techList.map((techKey) => {
          const tech = techInfo.Technologies[techKey];
          if (!tech) return null;
          return (
            <ImageCard
              key={tech.name}
              title={tech.name}
              image={tech.logo}
              href={tech.website}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCard;
