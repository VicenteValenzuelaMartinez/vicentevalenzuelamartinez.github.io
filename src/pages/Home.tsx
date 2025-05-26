import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ProjectCard from "../component/ProjectCard";
import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";

function Home() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const translations = currentLang === "es" ? esTranslation : enTranslation;

  const projectKeys = Object.keys(translations.Home.Projects);

  return (
    <>
      <div className="flex justify-center items-center md:h-2/3 h-1/3 pt-10 border border-neutral-900 bg-gradient-to-r from-sky-900 to-zinc-950">
        <div className="flex flex-wrap">
          <div className="flex flex-col items-center pl-16">
            <div className="md:text-7xl text-4xl font-serif md:pb-5 p-2">
              {t("Home.Headline")}
            </div>
            <div className="md:text-3xl text-xl font-serif md:pb-2 p-1">
              {t("Home.Subtitle")}
            </div>
            <div className="text-lg font-serif pb-10">
              {t("Home.Subtitle2")}
            </div>
          </div>
        </div>
      </div>
      <div className="md:pl-16 px-10">
        <div className="flex flex-wrap">
          <div className="flex flex-col md:text-justify text-center md:p-10 pl-10 py-10 font-serif">
            <div className="md:text-4xl text-3xl md:text-left pb-5">{t("Home.Intro")}</div>
            <span className="md:text-2xl text-xl">{t("Home.Intro2")}</span>
            <span className="md:text-2xl text-xl pb-10">{t("Home.Intro3")}</span>
            <span className="md:text-2xl text-xl pb-3">{t("Home.Intro4")}</span>
            <Link to="/contact" className="text-blue-400 md:text-2xl pb-10 text-xl">
              {t("About.ContactMe")}
            </Link>
            <div className="md:text-2xl text-xl">{t("Home.Intro5")}</div>
          </div>
        </div>
      </div>
      <div className="h-10">
        <div className="md:px-25 pl-16 py-10 flex flex-wrap border border-neutral-900 bg-gradient-to-l from-purple-950 to-zinc-950">
          <div className="flex flex-col flex-1 gap-10  font-serif ">
            <span className="md:text-3xl text-2xl">{t("Home.ProjectsIntro")}: </span>
            {projectKeys.map((key) => (
              <ProjectCard key={key} projectKey={key} />
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
