import { useTranslation } from "react-i18next";

interface PageCountProps {
  currentPageNumber: number;
}

const PageCount = ({ currentPageNumber }: PageCountProps) => {
  const { t } = useTranslation();
  const displayPageText =
    currentPageNumber === 0 ? t("Webcomic.Cover") : `${t("Webcomic.Page")} ${currentPageNumber}`;

  return (
    <div className="text-center p-3">
      <span>{displayPageText}</span>
    </div>
  );
};

export default PageCount;
