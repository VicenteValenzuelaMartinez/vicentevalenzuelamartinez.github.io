import classNames from "classnames";
import {
  HomeIcon,
  AtSymbolIcon,
  InformationCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const pageNavigation = [
  { name: "Home", href: "/", current: false, icon: HomeIcon },
  {
    name: "Sobre Mi",
    href: "/about",
    current: false,
    icon: InformationCircleIcon,
  },
  { name: "Contacto", href: "/contact", current: false, icon: AtSymbolIcon },
  { name: "Webcomics", href: "/webcomic", current: false, icon: BookOpenIcon },
];

const SidebarMenu = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  return (
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
                "flex items-center gap-3 px-3 py-4 hover:bg-sky-700 whitespace-nowrap",
                isActive && "bg-zinc-900 hover:bg-zinc-900"
              )}
            >
              <Icon className="pl-2 w-8 h-8 flex-shrink-0" />
              {isHovered && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarMenu;
