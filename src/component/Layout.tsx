import TopBar from "./Topbar";
import SidebarMenu from "./SidebarMenu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <SidebarMenu />
        <main className="flex-1 overflow-auto bg-zinc-900 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
