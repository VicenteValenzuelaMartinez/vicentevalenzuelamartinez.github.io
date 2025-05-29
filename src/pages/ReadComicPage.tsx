import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { userIsMobile } from "../hooks/UserIsMobile";

const cloudBaseUrl =
  "https://res.cloudinary.com/dh4jh6f21/image/upload/v1748391105";

function ReadComicPage() {
  const isMobile = userIsMobile();
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
  const [prevExists, setPrevExists] = useState(false);
  const [nextChapterExists, setNextChapterExists] = useState(false);
  const [prevChapterExists, setPrevChapterExists] = useState(false);
  const [prevChapterLastPage, setPrevChapterLastPage] = useState<number | null>(
    null
  );

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const nextChapterUrl = `${cloudBaseUrl}/${lang}_${shortCode}${
    parseInt(chapter!) + 1
  }p0.png`;
  const prevChapterUrl = `${cloudBaseUrl}/${lang}_${shortCode}${
    parseInt(chapter!) - 1
  }p0.png`;

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const urlsToCheck = [
      { url: imageUrl, setState: setImageExists },
      { url: nextUrl, setState: setNextExists },
      { url: prevUrl, setState: setPrevExists },
      { url: nextChapterUrl, setState: setNextChapterExists },
      { url: prevChapterUrl, setState: setPrevChapterExists },
    ];

    urlsToCheck.forEach(({ url, setState }) => {
      const img = new Image();
      img.src = url;
      img.onload = () => setState(true);
      img.onerror = () => setState(false);
    });
  }, [imageUrl, nextUrl, prevUrl, nextChapterUrl, prevChapterUrl]);

  useEffect(() => {
    const previousChapter = parseInt(chapter!) - 1;
    const maxPagesToTry = 50;
    const testPrevChapter = async () => {
      const baseUrl = `${cloudBaseUrl}/${lang}_${shortCode}${previousChapter}p`;
      let lastValidPage = -1;

      for (let i = 0; i < maxPagesToTry; i++) {
        const url = `${baseUrl}${i}.png`;
        const img = new Image();
        img.src = url;

        await new Promise((resolve) => {
          img.onload = () => {
            lastValidPage = i;
            resolve(null);
          };
          img.onerror = () => resolve(null);
        });
      }

      if (lastValidPage >= 0) {
        setPrevChapterExists(true);
        setPrevChapterLastPage(lastValidPage);
      } else {
        setPrevChapterExists(false);
      }
    };

    testPrevChapter();
  }, [chapter, lang, shortCode]);

  const goToPage = (newPage: number) => {
    if (newPage < 0) {
      if (prevChapterExists && prevChapterLastPage !== null) {
        navigate(
          `/webcomic/${lang}/${comic}/${
            parseInt(chapter!) - 1
          }/${prevChapterLastPage}`
        );
      }
      return;
    }

    if (!nextExists && newPage > page && nextChapterExists) {
      navigate(`/webcomic/${lang}/${comic}/${parseInt(chapter!) + 1}/0`);
      return;
    }

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

    if (delta < -50) {
      if (nextExists) {
        goToPage(page + 1);
      } else if (nextChapterExists) {
        goToPage(page + 1);
      }
    } else if (delta > 50) {
      if (page > 0) {
        goToPage(page - 1);
      } else if (prevChapterExists) {
        goToPage(page - 1);
      }
    }

    setDragX(0);
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
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow hover:bg-zinc-950"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}
          {nextExists && (
            <button
              onClick={() => goToPage(page + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow hover:bg-zinc-950"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        {isMobile ? (
          <div className="md:hidden relative w-full h-full overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `${
                  prevExists
                    ? `translateX(calc(-100% + ${dragX}px))`
                    : `translateX(calc(${dragX}px))`
                }`,
              }}
            >
              {prevExists && (
                <img
                  src={prevUrl}
                  alt={`Previous page`}
                  className="h-full w-full object-contain flex-shrink-0"
                />
              )}
              <img
                src={imageUrl || ""}
                alt={`Current page`}
                className="h-full w-full object-contain flex-shrink-0"
              />
              {nextExists && (
                <img
                  src={nextUrl}
                  alt={`Next page`}
                  className="h-full w-full object-contain flex-shrink-0"
                />
              )}
            </div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Page ${page}`}
            className="h-0 md:h-full w-full object-contain"
          />
        )}
      </div>
    </div>
  );
}

export default ReadComicPage;
