import classNames from "classnames";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About Me", href: "about", current: false },
  { name: "Contact", href: "info", current: false },
  { name: "Webcomics", href: "webcomic", current: false },
];

const NavBar = () => {
  return (
    <nav className="bg-zinc-900 p-5">
      <ul className="flex space-x-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                "text-white px-5 py-2 rounded-sm text-md font-medium",
                {
                  "bg-zinc-700": item.current,
                  "hover:bg-gray-600": !item.current,
                }
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
