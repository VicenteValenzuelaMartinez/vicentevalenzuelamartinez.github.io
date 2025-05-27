import { useLocation } from "react-router-dom";
import { pageNavigation } from "./SidebarMenu";
import { match } from "ts-pattern";
import { useTranslation } from "react-i18next";

const TopBar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const current = pageNavigation.find(
    (item) => item.href === location.pathname
  );

  const title = match(location.pathname)
    .with("/", () => "Vincent's Factory")
    .otherwise(() => current?.name ?? "Vincent's Factory");

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-zinc-950 p-5">
      <ul className="flex justify-between items-center">
        <li className="flex space-x-4 items-center">
          <img src="/logovincent.svg" width={25} alt="Logo" />
          <span>{t(title)}</span>
        </li>
        <li>
          <button
            onClick={toggleLanguage}
            className="bg-zinc-800 text-white px-3 py-1 rounded hover:bg-zinc-700 transition"
          >
            {i18n.language === "en" ? "EN" : "ES"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TopBar;
