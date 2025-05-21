import { Link } from "react-router-dom";

interface coverProps {
  image: string;
  imageOnHover: string;
  title: string;
  href: string;
}

const CoverCard = ({ title, image, imageOnHover, href }: coverProps) => {
  return (
    <div className="flex flex-col items-center group transition-transform duration-300 transform hover:scale-110">
      <Link
        to={href}
        className="relative w-64 h-128 overflow-hidden rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700"
      >
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
        />
        <img
          src={imageOnHover}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
      </Link>
      <h5 className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h5>
    </div>
  );
};

export default CoverCard;
