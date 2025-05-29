import { useRef, useState, useEffect } from "react";
import TopBar from "./Topbar";
import SidebarMenu from "./SidebarMenu";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../hooks/ScrollToTop";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar
        isMobile={isMobile}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="flex flex-1 overflow-hidden">
        <SidebarMenu
          isMobile={isMobile}
          isSidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main
          ref={mainRef}
          className="flex-1 overflow-auto bg-zinc-900 text-white"
        >
          <ScrollToTop scrollRef={mainRef} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
