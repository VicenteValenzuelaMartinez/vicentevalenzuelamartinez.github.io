import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { pageNavigation } from "../hooks/PageNavitagion";

interface sidebarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarMenu = ({ isMobile, isSidebarOpen, setSidebarOpen }: sidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const showSidebar = isMobile ? isSidebarOpen : isHovered;

  return (
    <>
      {showSidebar && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-zinc-950/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`fixed top-[4rem] left-0 h-[calc(100vh-4rem)] z-40 bg-sky-950 text-white transition-all duration-300 overflow-hidden ${
          showSidebar ? "w-64" : "md:w-16 w-0"
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
                  "flex items-center gap-3 px-3 py-5 whitespace-nowrap",
                  isActive ? "bg-cyan-700" : "hover:bg-sky-700"
                )}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <Icon className="pl-2 w-8 h-8 flex-shrink-0" />
                {showSidebar && <span>{t(item.name)}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default SidebarMenu;
