import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import { IntlProvider } from "react-intl";
import en from "../i18n/en.json";
import fa from "../i18n/fa.json";
import { useRouter } from "next/router";
import { PostsProvider } from "../context/postsContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

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
  const getLayout = Component.getLayout || ((page) => page);
  const { locale } = useRouter();
  const isPersian = locale === "fa";
  return (
    <UserProvider>
      <PostsProvider>
        <main className={`${isPersian ? "font-sans-fa" : "font-sans-en"} `}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            {getLayout(
              <Component {...pageProps} dir={getDirection(locale)} />,
              pageProps
            )}
          </IntlProvider>
        </main>
      </PostsProvider>
    </UserProvider>
  );
}
