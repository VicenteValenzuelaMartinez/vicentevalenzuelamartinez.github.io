import {
  HomeIcon,
  AtSymbolIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

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
  }
];
