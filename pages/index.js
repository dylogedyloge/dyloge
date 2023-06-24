import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useIntl } from "react-intl";
import Flag from "react-world-flags";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnchor,
  faAppleWhole,
  faBabyCarriage,
  faChalkboard,
  faCode,
  faFile,
  faImage,
  faPencil,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

export default function Home({ dir }) {
  // Theme Change
  const [theme, setTheme] = useLocalStorage();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);

  // i18n
  const { locale, locales, push, asPath } = useRouter();
  const intl = useIntl();
  const logo = intl.formatMessage({
    id: "page.home.logo",
  });
  const getStartedButton = intl.formatMessage({
    id: "page.home.button.getStarted",
  });
  const navItemProducts = intl.formatMessage({
    id: "page.home.navItem.products",
  });
  const navItemPricing = intl.formatMessage({
    id: "page.home.navItem.pricing",
  });
  const navItemAbout = intl.formatMessage({
    id: "page.home.navItem.about",
  });
  const navItemAboutTeam = intl.formatMessage({
    id: "page.home.navItem.about.team",
  });
  const navItemAboutMethod = intl.formatMessage({
    id: "page.home.navItem.about.method",
  });
  const heroTitle = intl.formatMessage({
    id: "page.home.hero.title",
  });
  const heroDescription = intl.formatMessage({
    id: "page.home.hero.description",
  });
  const featuresCodingTitle = intl.formatMessage({
    id: "page.home.features.coding.title",
  });
  const featuresCodingDescription = intl.formatMessage({
    id: "page.home.features.coding.description",
  });
  const featuresWritingTitle = intl.formatMessage({
    id: "page.home.features.writing.title",
  });
  const featuresWritingDescription = intl.formatMessage({
    id: "page.home.features.writing.description",
  });
  const featuresImagesTitle = intl.formatMessage({
    id: "page.home.features.images.title",
  });
  const featuresImagesDescription = intl.formatMessage({
    id: "page.home.features.images.description",
  });
  const featuresLearningTitle = intl.formatMessage({
    id: "page.home.features.learning.title",
  });
  const featuresLearningDescription = intl.formatMessage({
    id: "page.home.features.learning.description",
  });
  const featuresFilesTitle = intl.formatMessage({
    id: "page.home.features.files.title",
  });
  const featuresFilesDescription = intl.formatMessage({
    id: "page.home.features.files.description",
  });
  const featuresOthersTitle = intl.formatMessage({
    id: "page.home.features.others.title",
  });
  const featuresOthersDescription = intl.formatMessage({
    id: "page.home.features.others.description",
  });
  const ourservicesTitle = intl.formatMessage({
    id: "page.home.ourservices.title",
  });
  const testimonialsTitle = intl.formatMessage({
    id: "page.home.testimonials.title",
  });
  const testimonialsDescription1 = intl.formatMessage({
    id: "page.home.testimonials.description1",
  });
  const testimonialsAuthor1 = intl.formatMessage({
    id: "page.home.testimonials.author1",
  });
  const testimonialsPosition1 = intl.formatMessage({
    id: "page.home.testimonials.position1",
  });
  const testimonialsCompany1 = intl.formatMessage({
    id: "page.home.testimonials.company1",
  });
  const testimonialsDescription2 = intl.formatMessage({
    id: "page.home.testimonials.description2",
  });
  const testimonialsAuthor2 = intl.formatMessage({
    id: "page.home.testimonials.author2",
  });
  const testimonialsPosition2 = intl.formatMessage({
    id: "page.home.testimonials.position2",
  });
  const testimonialsCompany2 = intl.formatMessage({
    id: "page.home.testimonials.company2",
  });
  const testimonialsDescription3 = intl.formatMessage({
    id: "page.home.testimonials.description3",
  });
  const testimonialsAuthor3 = intl.formatMessage({
    id: "page.home.testimonials.author3",
  });
  const testimonialsPosition3 = intl.formatMessage({
    id: "page.home.testimonials.position3",
  });
  const testimonialsCompany3 = intl.formatMessage({
    id: "page.home.testimonials.company3",
  });

  // Features Data
  const featuresData = [
    {
      title: featuresCodingTitle,
      description: featuresCodingDescription,
      icon: faCode,
    },
    {
      title: featuresWritingTitle,
      description: featuresWritingDescription,
      icon: faPencil,
    },
    {
      title: featuresImagesTitle,
      description: featuresImagesDescription,
      icon: faImage,
    },
    {
      title: featuresLearningTitle,
      description: featuresLearningDescription,
      icon: faChalkboard,
    },
    {
      title: featuresFilesTitle,
      description: featuresFilesDescription,
      icon: faFile,
    },
    {
      title: featuresOthersTitle,
      description: featuresOthersDescription,
      icon: faToolbox,
    },
  ];
  // Testimonials Data
  const testimonialsData = [
    {
      text: testimonialsDescription1,
      name: testimonialsAuthor1,
      avatar: "/avatar1.jpg",
      position: testimonialsPosition1,
      company: testimonialsCompany1,
      companyLogo: faAnchor,
    },
    {
      text: testimonialsDescription2,
      name: testimonialsAuthor2,
      avatar: "/avatar2.jpg",
      position: testimonialsPosition2,
      company: testimonialsCompany2,
      companyLogo: faBabyCarriage,
    },
    {
      text: testimonialsDescription3,
      name: testimonialsAuthor3,
      avatar: "/avatar3.jpg",
      position: testimonialsPosition3,
      company: testimonialsCompany3,
      companyLogo: faAppleWhole,
    },
  ];

  return (
    <main className="min-w-fit" dir={dir}>
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-bold"
            >
              <li>
                <a>{navItemProducts}</a>
              </li>
              <li>
                <a>{navItemAbout}</a>
                <ul className="py-2 px-4 ">
                  <li>
                    <a>{navItemAboutTeam}</a>
                  </li>
                  <li>
                    <a>{navItemAboutMethod}</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>{navItemPricing}</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl flex items-end ">
            <Image src="/dyloge.png" width={40} height={40} alt="dyloge" />
            <div className="text-2xl">{logo}</div>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            <li>
              <a>{navItemProducts}</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>{navItemAbout}</summary>
                <ul className="p-2">
                  <li>
                    <a>{navItemAboutTeam}</a>
                  </li>
                  <li>
                    <a>{navItemAboutMethod}</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>{navItemPricing}</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {/* Choose Language */}
          <div
            className={`${
              locale === "fa" ? "dropdown-right" : "dropdown-left"
            } dropdown dropdown-bottom flex gap-4`}
          >
            <label tabIndex={0} className="cursor-pointer">
              <Flag code={locale === "fa" ? "ir" : "us"} className="h-4 w-5" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 gap-2 mt-5"
            >
              {locales.map((locale) => (
                <li key={locale}>
                  <Link
                    href={asPath}
                    locale={locale}
                    className="flex justify-between"
                  >
                    <div> {locale === "fa" ? "فارسی" : "English"}</div>
                    <div>
                      <Flag
                        code={locale === "fa" ? "ir" : "us"}
                        className="h-4 w-5"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Choose Theme */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={toggleTheme} />

            <svg
              className="swap-on fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off fill-current w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
      {/* Hero */}
      <div className="hero py-32 bg-base-100 px-6">
        <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
          <Image src="/hero.svg" width={500} height={500} alt="hero" />
          <div>
            <h1 className="text-2xl font-semibold mb-10">{heroTitle}</h1>
            <h1 className="text-8xl font-bold">{logo}</h1>
            <div className="py-6">{heroDescription}</div>

            <Link href="/post/new" className="btn btn-primary">
              {getStartedButton}
            </Link>

            {/* <button className="btn btn-primary">{getStartedButton}</button> */}
          </div>
        </div>
      </div>
      {/* Features */}
      <div className="grid place-items-center w-full bg-base-200">
        <div className="max-w-5xl py-24 content-center justify-center">
          <h1 className="text-4xl  text-center font-bold">
            {ourservicesTitle}
          </h1>
          <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8 px-6">
            {featuresData.map((i, k) => {
              return (
                <div
                  key={k}
                  className="card w-full bg-base-100 shadow-xl hover:shadow-2xl cursor-pointer"
                >
                  <div className="card-body mt-4 items-center text-center">
                    <h2 className="card-title flex justify-between items-center">
                      <FontAwesomeIcon icon={i.icon} className="text-primary" />
                      <div>{i.title}</div>
                    </h2>
                    <div>{i.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Tetimonilas */}
      <div className="grid place-items-center w-full bg-base-100">
        <div className="max-w-5xl py-24 content-center justify-center">
          <h1 className="text-4xl  text-center font-bold">
            {testimonialsTitle}
          </h1>
          <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8 px-6">
            {testimonialsData.map((t, k) => {
              return (
                <div key={k} className="card w-full bg-base-100 shadow-xl">
                  <div className="avatar flex justify-center items-center">
                    <div className="rounded ">
                      <Image
                        src={t.avatar}
                        alt="author"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="card-body items-center text-center">
                    <div>{t.text}</div>
                    <div className="flex">
                      <div className="text-slate-500">{t.name}</div>
                      <div className="text-slate-500">-{t.position}</div>
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                      <FontAwesomeIcon icon={t.companyLogo} className="" />
                      <div className="text-slate-500">{t.company}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-100 text-base-content">
        <div className="">
          <Image src="/dyloge.png" width={50} height={50} alt="dyloge" />

          <div className="font-bold">dyloge</div>
          <div>Copyright © 2023 - All right reserved</div>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
