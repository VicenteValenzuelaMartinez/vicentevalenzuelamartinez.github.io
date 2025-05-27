interface cardProps {
  image: string;
  title: string;
  href: string;
}

const ImageCard = ({ title, image, href }: cardProps) => {
  return (
    <div className="w-24 flex flex-col items-center group transition-transform duration-300 transform hover:scale-110">
      <a
        href={href}
        target="_blank"
        className="flex items-center justify-center relative md:w-32 md:h-32 w-16 h-16 overflow-hidden rounded-lg shadow-md dark:border-zinc-700"
      >
        <img
          src={image}
          alt=""
          className="max-w-full max-h-full object-contain"
        />
      </a>
      <h5 className="mt-2 text-center text-sm font-semibold text-gray-900 dark:text-white w-full truncate">
        {title}
      </h5>
    </div>
  );
};

export default ImageCard;
