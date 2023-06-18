import "@/styles/globals.css";
import { IntlProvider } from "react-intl";
import en from "../i18n/en.json";
import fa from "../i18n/fa.json";
import { useRouter } from "next/router";

const messages = {
  en,
  fa,
};
function getDirection(locale) {
  if (locale === "fa") {
    return "rtl";
  }
  return "ltr";
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();
  const isPersian = locale === "fa";
  return (
    <main className={`${isPersian ? "font-sans-fa" : "font-sans-en"} `}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Component {...pageProps} dir={getDirection(locale)} />
      </IntlProvider>
    </main>
  );
}
