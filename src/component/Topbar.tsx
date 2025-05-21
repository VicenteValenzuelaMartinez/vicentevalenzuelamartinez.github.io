import { useLocation } from "react-router-dom";
import { pageNavigation } from "./SidebarMenu";
import { match } from "ts-pattern";

const TopBar = () => {
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
          <a>
            <span className="">{title}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TopBar;
