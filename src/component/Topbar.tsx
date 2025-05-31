import { useLocation } from "react-router-dom";
import { pageNavigation } from "../hooks/PageNavitagion";
import { match } from "ts-pattern";
import { useTranslation } from "react-i18next";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface topbarProps {
  isMobile: boolean;
  onToggleSidebar: () => void;
}

const TopBar = ({ isMobile, onToggleSidebar }: topbarProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const current = pageNavigation.find(
    (item) => item.href === location.pathname
  );

  const title = match(location.pathname)
    .with("/", () => "Portafolios Vicente")
    .otherwise(() => current?.name ?? "Portafolios Vicente");

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950 p-5">
      <ul className="flex justify-between items-center">
        <li className="flex space-x-4 items-center">
          {isMobile && (
            <button onClick={onToggleSidebar} className="mr-2">
              <Bars3Icon className="w-6 h-6 text-white" />
            </button>
          )}
          {isMobile ? <div className="px-1"></div>: (<img src="/logovincent.svg" width={25} alt="Logo" />)}
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
