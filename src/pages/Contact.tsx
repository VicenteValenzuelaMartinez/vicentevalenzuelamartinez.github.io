import { useTranslation } from "react-i18next";
import {} from "@heroicons/react/24/solid";
import devLogo from "/icons/dev-to.svg";

function Contact() {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-10 px-4 sm:px-6 md:px-8 md:pl-20 md:pl-0">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-serif pb-8 text-center">
            {t("Contact.Title")}
          </h1>
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-zinc-800 rounded-md shadow-lg overflow-hidden p-2">
            <div className="bg-zinc-900 p-4">
              <h2 className="text-xl sm:text-2xl">{t("Contact.Email")}:</h2>
              <p className="pt-2 text-base sm:text-lg break-words">
                {t("Contact.EmailAddress")}
              </p>
            </div>
            <div className="bg-zinc-900 p-2 mt-2">
              <h2 className="text-xl sm:text-2xl">
                {t("Contact.SocialMedia")}:
              </h2>
              <a
                className="flex gap-2 p-2 text-base sm:text-lg hover:bg-gray-700 items-center rounded"
                href="https://www.linkedin.com/in/vicente-valenzuela-martinez-00a932271/"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
                LinkedIn
              </a>
              <a
                className="flex gap-2 p-2 text-base sm:text-lg hover:bg-gray-700 items-center rounded"
                href="https://dev.to/vicentevalenzuelamartinez"
                target="_blank"
              >
                <img src={devLogo} className="w-5 h-5" alt="Vite logo" />
                DEV Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
