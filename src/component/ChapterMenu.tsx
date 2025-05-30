import { useParams, useNavigate } from "react-router-dom";
import { comicCodeMap } from "../utils/comicConfig";
import { useTranslation } from "react-i18next";

import chaptersData from "../json/component/chaptercount.json";

interface ChMenuProps {
  comicTitle: string;
}

const ChMenu = ({ comicTitle }: ChMenuProps) => {
  const { t } = useTranslation();
  const { lang, comic, chapter } = useParams<{
    lang: string;
    comic: string;
    chapter: string;
  }>();
  const navigate = useNavigate();

  const shortCode = comicTitle
    ? comicCodeMap[comicTitle.toLowerCase()] || comicTitle
    : "";

  const typedChaptersData = chaptersData.ChapterCount as Record<
    string,
    { es: string; en: string }
  >;

  const comicChaptersInfo = typedChaptersData[shortCode];
  const totalChapters =
    comicChaptersInfo &&
    comicChaptersInfo[lang as keyof typeof comicChaptersInfo]
      ? parseInt(comicChaptersInfo[lang as keyof typeof comicChaptersInfo], 10)
      : 0;

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChapter = e.target.value;
    if (selectedChapter) {
      navigate(`/webcomic/${lang}/${comic}/ch${selectedChapter}/0`);
    }
  };

  if (!comicTitle || !shortCode || totalChapters === 0) {
    return null;
  }

  const chapterOptions = [];
  for (let i = 1; i <= totalChapters; i++) {
    chapterOptions.push(
      <option key={i} value={i}>
        {t("Webcomic.Chapter")} {i}
      </option>
    );
  }
  const currentChapterNumber = chapter
    ? parseInt(chapter.replace("ch", ""), 10)
    : 1;

  return (
    <div className="p-2">
      <select
        id="chapter-select"
        value={currentChapterNumber}
        onChange={handleChapterChange}
        className="border border-zinc-600 p-1"
      >
        {chapterOptions}
      </select>
    </div>
  );
};

export default ChMenu;
