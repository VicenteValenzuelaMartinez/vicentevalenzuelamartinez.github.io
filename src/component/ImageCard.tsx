interface cardProps {
  image: string;
  title: string;
  href: string;
}

const ImageCard = ({ title, image, href }: cardProps) => {
  return (
    <div className="flex flex-col items-center group transition-transform duration-300 transform hover:scale-110">
      <a
        href={href}
        target="_blank"
        className="flex items-center justify-center relative w-32 h-32 overflow-hidden rounded-lg shadow-md dark:border-zinc-700"
      >
        <img src={image} alt="" className="justify-center max-w-full max-h-full object-contain" />
      </a>
        <h5 className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h5>
    </div>
  );
};

export default ImageCard;
