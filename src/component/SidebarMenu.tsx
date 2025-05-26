import classNames from "classnames";
import {
  HomeIcon,
  AtSymbolIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const pageNavigation = [
  { name: "Sidebar.Home", href: "/", current: false, icon: HomeIcon },
  {
    name: "Sidebar.About",
    href: "/about",
    current: false,
    icon: InformationCircleIcon,
  },
  {
    name: "Sidebar.Contact",
    href: "/contact",
    current: false,
    icon: AtSymbolIcon,
  },
  // {
  //   name: "Sidebar.Webcomics",
  //   href: "/webcomic",
  //   current: false,
  //   icon: BookOpenIcon,
  // },
];

const SidebarMenu = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      {isHovered && (
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-950/50 z-30 transition-opacity duration-300 pointer-events-none" />
      )}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-[4rem] left-0 h-[calc(100vh-4rem)] z-40 bg-sky-950 text-white transition-all duration-300 overflow-hidden ${
          isHovered ? "w-64" : "w-16"
        }`}
      >
        <nav className="flex flex-col">
          {pageNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  "flex items-center gap-3 px-3 py-4 whitespace-nowrap",
                  isActive ? "bg-cyan-700" : "hover:bg-sky-700"
                )}
              >
                <Icon className="pl-2 w-8 h-8 flex-shrink-0" />
                {isHovered && <span>{t(item.name)}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default SidebarMenu;
