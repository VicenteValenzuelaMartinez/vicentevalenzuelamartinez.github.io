import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { userIsMobile } from "../hooks/UserIsMobile";
import chapters from "../json/component/chaptercount.json";

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

  const curChapterNumberStr = chapter!.replace(/[^0-9]/g, "");
  const curChapterNumber = parseInt(curChapterNumberStr);

  const [imageExists, setImageExists] = useState(true);
  const [nextExists, setNextExists] = useState(false);
  const [nextChapterExists, setNextChapterExists] = useState(false);
  const [prevChapterExists, setPrevChapterExists] = useState(false);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const urlsToCheck = [
      { url: imageUrl, setState: setImageExists },
      { url: nextUrl, setState: setNextExists },
    ];
    urlsToCheck.forEach(({ url, setState }) => {
      const img = new Image();
      img.src = url;
      img.onload = () => setState(true);
      img.onerror = () => setState(false);
    });
  }, [imageUrl, nextUrl]);

  useEffect(() => {
    const chapterData = (
      chapters.ChapterCount as Record<string, { es: string; en: string }>
    )[shortCode];
    const totalChapters = chapterData ? parseInt(chapterData.es) : 0;

    if (curChapterNumber < totalChapters) {
      setNextChapterExists(true);
    } else {
      setNextChapterExists(false);
    }

    if (curChapterNumber > 1) {
      setPrevChapterExists(true);
    } else {
      setPrevChapterExists(false);
    }
  }, [curChapterNumber, shortCode, chapters]);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage < 0) {
        if (prevChapterExists) {
          navigate(`/webcomic/${lang}/${comic}/${parseInt(chapter!) - 1}/15`);
        }
        return;
      }

      if (!nextExists && newPage > page && nextChapterExists) {
        navigate(`/webcomic/${lang}/${comic}/${parseInt(chapter!) + 1}/0`);
        return;
      }
      navigate(`/webcomic/${lang}/${comic}/${chapter}/${newPage}`);
    },
    [
      chapter,
      comic,
      lang,
      navigate,
      nextChapterExists,
      nextExists,
      page,
      prevChapterExists,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPage(page - 1);
      } else if (e.key === "ArrowRight") {
        if (nextExists && page < 15) {
          goToPage(page + 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [page, goToPage, nextExists, nextChapterExists, prevChapterExists]);

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
                  page > 0
                    ? `translateX(calc(-100% + ${dragX}px))`
                    : `translateX(calc(${dragX}px))`
                }`,
              }}
            >
              {page > 0 && (
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
