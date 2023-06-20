import { useUser } from "@auth0/nextjs-auth0/client";
import {
  faArrowLeft,
  faArrowRight,
  faArrowRightFromBracket,
  faCircleHalfStroke,
  faCoins,
  faLanguage,
  faMoon,
  faPlus,
  faSun,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import PostsContext from "../../context/postsContext";
import { useLocalStorage } from "usehooks-ts";
import Flag from "react-world-flags";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

export const AppLayout = ({
  children,
  availableTokens,
  posts: postsFromSSR,
  postId,
  postCreated,
}) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts, getPosts, noMorePosts } =
    useContext(PostsContext);

  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
    if (postId) {
      const exists = postsFromSSR.find((post) => post._id === postId);
      if (!exists) {
        getPosts({ getNewerPosts: true, lastPostDate: postCreated });
      }
    }
  }, [postsFromSSR, setPostsFromSSR, postId, postCreated, getPosts]);
  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // Theme Change
  const [theme, setTheme] = useLocalStorage();
  const toggleTheme = () => {
    setTheme(theme === "business" ? "corporate" : "business");
  };
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);
  // i18n
  const { locale, locales, push, asPath } = useRouter();
  const intl = useIntl();

  return (
    <div className="flex">
      {/* Main Menu */}

      <ul className="menu bg-base-200 rounded-box">
        <li>
          <a className="tooltip tooltip-right" data-tip="Home">
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
        </li>
        <li>
          <a className="tooltip tooltip-right" data-tip="Details">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a className="tooltip tooltip-right" data-tip="Stats">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </a>
        </li>
      </ul>
      {/*  */}
      <div className="drawer ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <div className="grid place-items-end"></div>
          <label
            htmlFor="my-drawer-2"
            className="btn drawer-button btn-outline m-4"
            onClick={toggleDrawer}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              onClick={toggleDrawer}
              className="hidden lg:hidden"
            />
          </label>

          {children}
        </div>
        {/*  */}

        {/*  */}
        <div className="drawer-side bg-base-100 sm: w-3/4 lg:w-1/5 flex flex-col p-4">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="flex flex-col gap-10 w-full">
            <div className="flex gap-2 w-full">
              <Link href="/post/new" className="btn btn-outline flex-auto">
                <FontAwesomeIcon icon={faPlus} />
                New post
              </Link>
              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button btn-outline flex-auto"
                onClick={toggleDrawer}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={toggleDrawer}
                  className=""
                />
              </label>
            </div>

            <progress
              className={` progress ${
                availableTokens >= 50
                  ? "progress-success"
                  : availableTokens <= 25
                  ? "progress-warning"
                  : availableTokens < 10
                  ? " progress-error"
                  : ""
              }`}
              value={availableTokens}
              max="50"
            ></progress>
          </div>

          <ul className="menu bg-base-200 w-full mt-10">
            {posts.map((post) => (
              <li key={post._id} className="flex justify-between flex-row">
                <div className="flex-1 overflow-hidden">
                  <Link href={`/post/${post._id}`} className="truncate ">
                    {post.topic}
                  </Link>
                </div>

                <FontAwesomeIcon icon={faTrash} />
              </li>
            ))}
            {!noMorePosts && (
              <div
                onClick={() => {
                  getPosts({ lastPostDate: posts[posts.length - 1].create });
                }}
                className="hover:underline text-sm text-base-content text-center cursor-pointer mt-4"
              >
                Load more posts
              </div>
            )}
          </ul>
          <div className="divider"></div>
          {/* <div className="flex flex-col "> */}
          <ul className="menu bg-base-200 w-full">
            <li>
              <div>
                <FontAwesomeIcon icon={faCoins} />
                <div className="">Buy Tokens</div>
                <Link href="/token-topup">
                  <div
                    className={`badge ${
                      availableTokens >= 50
                        ? "badge-success"
                        : availableTokens <= 25
                        ? "badge-warning"
                        : availableTokens < 10
                        ? " badge-error"
                        : ""
                    }`}
                  >
                    {availableTokens}
                  </div>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <FontAwesomeIcon icon={faCircleHalfStroke} />
                <div className="">Theme</div>
                {/* Choose Theme */}
                <label className="swap swap-rotate">
                  <input type="checkbox" onChange={toggleTheme} />

                  <FontAwesomeIcon icon={faMoon} className="swap-on" />

                  <FontAwesomeIcon icon={faSun} className="swap-off" />
                </label>
              </div>
            </li>
            <li>
              <div>
                <FontAwesomeIcon icon={faLanguage} />
                <div className="">Language</div>

                {/* Choose Language */}
                <div
                  className={`${
                    locale === "fa" ? "dropdown-right" : "dropdown-left"
                  } dropdown dropdown-bottom flex gap-4`}
                >
                  <label tabIndex={0} className="cursor-pointer">
                    <Flag
                      code={locale === "fa" ? "ir" : "us"}
                      className="h-4 w-5"
                    />
                  </label>
                  <label className="swap swap-rotate">
                    <input type="checkbox" onChange={toggleTheme} />
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
                {/* <label className="swap swap-rotate">
                  <input type="checkbox" onChange={toggleTheme} />

                  <Flag code="ir" className="h-4 w-5 swap-on" />
                  <Flag code="us" className="h-4 w-5 swap-off" />

                </label> */}
              </div>
            </li>
            <li>
              {!!user ? (
                <div>
                  <Image
                    src={user.picture}
                    alt={user.name}
                    height={20}
                    width={20}
                    className="rounded-full"
                  />
                  <div className="">{user.name}</div>
                  <Link href="/api/auth/logout">
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="text-red-900"
                    />
                  </Link>
                </div>
              ) : (
                <Link href="/api/auth/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
