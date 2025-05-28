import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { RefObject } from "react";

interface ScrollToTopProps {
  scrollRef: RefObject<HTMLElement | null>;
}

const ScrollToTop = ({ scrollRef }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [pathname, scrollRef]);

  return null;
};

export default ScrollToTop;
