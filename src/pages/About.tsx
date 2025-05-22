import { useTranslation } from "react-i18next";
import ImageCard from "../component/ImageCard";
import { Link } from "react-router-dom";

function About() {
  const { t } = useTranslation();
  const technologies = t("About.Tecnologies", { returnObjects: true });
  const companies = t("About.Companies", { returnObjects: true });

  return (
    <>
      <div className="pt-10">
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-col items-start">
            <div className="text-4xl font-serif pb-10">{t("About.Title")}</div>
            <div className="flex relative w-256 overflow-hidden bg-zinc-800 border border-zinc-200 dark:border-zinc-600 transition-transform duration-300 transform hover:scale-105">
              <div className="bg-zinc-900 p-3 px-5 m-2 w-1/2">
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
              <div className="w-1/2 p-3 m-2">
                <img src="/aboutme.webp" title="me" />
              </div>
            </div>
            <div className="pt-10 text-3xl font-serif w-256">
              {t("About.WorkedOn")}
              <div className="flex relative gap-25 pt-5 justify-center items-center">
                {Object.values(companies).map((company) => (
                  <ImageCard
                    image={company.logo}
                    title={company.name}
                    href={company.website}
                  />
                ))}
              </div>
            </div>
            <div className="pt-10 text-3xl font-serif w-256">
              {t("About.HopeTo")}
              <div>
                <Link className="text-2xl pt-5 text-blue-400" to={"/contact"}>
                  {t("About.ContactMe")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
