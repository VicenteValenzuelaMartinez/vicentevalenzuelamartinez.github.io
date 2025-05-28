import { useTranslation } from "react-i18next";
import ImageCard from "../component/ImageCard";
import { Link } from "react-router-dom";

function About() {
  const { t } = useTranslation();
  const technologies = t("About.Tecnologies", { returnObjects: true });
  const companies = t("About.Companies", { returnObjects: true });

  return (
    <div className="md:pl-20 pt-10 px-4 max-w-7xl mx-auto">
      <div className="text-4xl font-serif pb-10">{t("About.Title")}</div>

      <div className="flex flex-col md:flex-row bg-zinc-800 border border-zinc-200 dark:border-zinc-600 overflow-hidden transition-transform duration-300 transform hover:scale-105">
        <div className="bg-zinc-900 p-4 md:w-1/2">
          <div className="pt-3 text-xl">{t("About.Subtitle")}</div>
          <div className="pt-2">{t("About.P1")}</div>
          <div className="pt-2">{t("About.P2")}</div>
          <ul className="list-disc list-inside pt-2">
            {Object.values(technologies).map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
          <div className="pt-2">{t("About.P3")}</div>
          <div className="pt-4">{t("About.Hobby")}</div>
        </div>
        <div className="p-4 md:w-1/2 flex items-center justify-center">
          <img
            src="/aboutme.webp"
            alt="me"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      </div>

      <div className="pt-10 text-3xl font-serif">
        {t("About.WorkedOn")}
        <div className="flex flex-wrap md:gap-15 gap-8 pt-5 justify-center items-center">
          {Object.values(companies).map((company, index) => (
            <ImageCard
              key={index}
              image={company.logo}
              title={company.name}
              href={company.website}
            />
          ))}
        </div>
      </div>

      <div className="py-10 text-3xl font-serif">
        {t("About.HopeTo")}
        <div>
          <Link
            className="text-2xl pt-5 text-blue-400 underline hover:text-blue-500"
            to={"/contact"}
          >
            {t("About.ContactMe")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
