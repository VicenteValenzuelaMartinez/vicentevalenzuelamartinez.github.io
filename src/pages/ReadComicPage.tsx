import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ForwardIcon, BackwardIcon } from "@heroicons/react/16/solid";

const cloudBaseUrl =
  "https://res.cloudinary.com/dh4jh6f21/image/upload/v1748391105";

function ReadComicPage() {
  const { lang, comic, chapter, pageNumber } = useParams();
  const navigate = useNavigate();
  const page = parseInt(pageNumber!, 10);
  const comicCodeMap: Record<string, string> = {
    knighttales: "kntl",
  };

  const shortCode = comic ? comicCodeMap[comic] || comic : "";
  const publicId = `${lang}_${shortCode}${chapter}p${page}`;
  const imageUrl = `${cloudBaseUrl}/${publicId}.png`;

  const [imageExists, setImageExists] = useState(true);
  const [nextExists, setNextExists] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const testImage = new Image();
    const nextUrl = `${cloudBaseUrl}/${lang}_${shortCode}${chapter}p${
      page + 1
    }.png`;
    testImage.src = nextUrl;
    testImage.onload = () => setNextExists(true);
    testImage.onerror = () => setNextExists(false);
  }, [lang, shortCode, page, chapter]);

  useEffect(() => {
    const testImage = new Image();
    testImage.src = imageUrl;
    testImage.onload = () => setImageExists(true);
    testImage.onerror = () => setImageExists(false);
  }, [imageUrl]);

  const goToPage = (newPage: number) => {
    navigate(`/webcomic/${lang}/${comic}/${chapter}/${newPage}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = (touchStartX.current ?? 0) - (touchEndX.current ?? 0);

    if (delta > 50 && nextExists) {
      goToPage(page + 1);
    } else if (delta < -50 && page > 0) {
      goToPage(page - 1);
    }
  };

  if (!imageExists) {
    return <div className="text-center mt-10 text-red-500">Page not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div
        className="relative w-full max-w-3xl h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hidden md:block">
          {page > 0 && (
            <button
              onClick={() => goToPage(page - 1)}
              className="text-black absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <BackwardIcon className="h-6 w-6" />
            </button>
          )}
          {nextExists && (
            <button
              onClick={() => goToPage(page + 1)}
              className="text-black absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <ForwardIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        <img
          src={imageUrl}
          alt={`Page ${page}`}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

export default ReadComicPage;
