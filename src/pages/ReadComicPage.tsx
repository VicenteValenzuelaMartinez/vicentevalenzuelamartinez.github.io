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
  const nextUrl = `${cloudBaseUrl}/${lang}_${shortCode}${chapter}p${
    page + 1
  }.png`;
  const prevUrl = `${cloudBaseUrl}/${lang}_${shortCode}${chapter}p${
    page - 1
  }.png`;

  const [imageExists, setImageExists] = useState(true);
  const [nextExists, setNextExists] = useState(false);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const testImage = new Image();
    testImage.src = nextUrl;
    testImage.onload = () => setNextExists(true);
    testImage.onerror = () => setNextExists(false);
  }, [nextUrl]);

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
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX.current;
    setDragX(deltaX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const delta = dragX;

    if (delta < -70 && nextExists) {
      goToPage(page + 1);
      setDragX(0);
    } else if (delta > 70 && page > 0) {
      goToPage(page - 1);
      setDragX(0);
    } else {
      setDragX(0);
    }

    touchStartX.current = null;
  };

  if (!imageExists) {
    return <div className="text-center mt-10 text-red-500">Page not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div
        className="relative w-full max-w-3xl h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
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

        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(calc(-100% + ${dragX}px))`,
            }}
          >
            <img
              src={prevUrl || ""}
              alt={`Previous page`}
              className="h-full w-full object-contain flex-shrink-0"
            />
            <img
              src={imageUrl || ""}
              alt={`Current page`}
              className="h-full w-full object-contain flex-shrink-0"
            />
            <img
              src={nextUrl || ""}
              alt={`Next page`}
              className="h-full w-full object-contain flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadComicPage;
