import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import images from "../json/component/projectImages.json";
import techData from "../json/component/technologies.json";
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
  const [fade, setFade] = useState(false);
  const [nextImage, setNextImage] = useState(1);

  const imagePaths = (typedImages[projectKey] || []).map(
    (filename: string) => `/projects/${projectKey}/${filename}`
  );

  useEffect(() => {
    if (imagePaths.length <= 1) return;
    const interval = setInterval(() => {
      const newNextImage = (currentImage + 1) % imagePaths.length;
      setNextImage(newNextImage);
      setFade(true);
      setTimeout(() => {
        setCurrentImage(newNextImage);
        setFade(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, imagePaths.length]);

  return (
    <div className="flex flex-col gap-4 md:p-4 p-1 bg-zinc-700 rounded-xl shadow">
      <div className="flex flex-col lg:flex-row md:gap-4 gap-1">
        <div className="flex-1 p-5 bg-zinc-900 rounded-xl">
          <h3 className="text-2xl font-bold">{project.Title}</h3>
          <p className="text-xl mt-2 text-gray-100 md:text-justify">
            {project.About}
          </p>
        </div>
        {imagePaths.length > 0 && (
          <div className="flex-1 relative overflow-hidden rounded-lg bg-zinc-900 md:p-5 p-0 h-100">
            <img
              src={imagePaths[currentImage]}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                fade ? "opacity-0 z-0" : "opacity-100 z-10"
              }`}
              alt="projectImage"
            />
            {imagePaths.length > 1 && (
              <img
                src={imagePaths[nextImage]}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                  fade ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                alt="projectImage2"
              />
            )}
          </div>
        )}
      </div>
      <div className="text-2xl flex flex-wrap justify-start">
        {t("Home.TecUsed")}
      </div>
      <div className="flex flex-wrap justify-center md:justify-start md:p-7 gap-10 md:gap-20 p-5 bg-zinc-900">
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
