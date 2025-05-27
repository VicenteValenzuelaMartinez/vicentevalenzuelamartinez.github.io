import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <div className="p-16 flex justify-center text-2xl">
      <div className="flex flex-col justify-center gap-15 text-center">
        {t("Error.Message")}
      <Link to={"/"} className="text-blue-500">
        {t("Error.Goback")}
      </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
