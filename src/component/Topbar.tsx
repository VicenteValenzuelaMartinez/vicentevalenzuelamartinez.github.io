import { useLocation } from "react-router-dom";
import { pageNavigation } from "./SidebarMenu";
import { match } from "ts-pattern";
import { useTranslation } from "react-i18next";
// import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const TopBar = () => {
    const { t } = useTranslation();
  const location = useLocation();
  const current = pageNavigation.find(
    (item) => item.href === location.pathname
  );
  const title = match(location.pathname)
    .with("/", () => "Vincent's Factory")
    .otherwise(() => current?.name ?? "Vincent's Factory");

  return (
    <nav className="ixed top-0 left-0 right-0 z-50 bg-zinc-950 p-5">
      <ul className="flex space-x-10">
        <li>
          <img src="/logovincent.svg" width={25} />
        </li>
        <li>
            <span className="">{t(title)}</span>
        </li>
          <li>
            {/* <Cog6ToothIcon onClick={} width={25} className="hover:animate-spin"/> */}
        </li>
      </ul>
    </nav>
  );
};

export default TopBar;
