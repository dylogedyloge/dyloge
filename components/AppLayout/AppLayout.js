import { useUser } from "@auth0/nextjs-auth0/client";
import {
  faAnglesLeft,
  faAnglesRight,
  faArrowDown,
  faArrowDownAZ,
  faArrowRightFromBracket,
  faCircleHalfStroke,
  faCode,
  faCoins,
  faFile,
  faFileImage,
  faFileUpload,
  faHouse,
  faImage,
  faInfo,
  faLanguage,
  faMoon,
  faPlus,
  faQuoteRight,
  faSun,
  faTrash,
  faUpload,
  faUser,
  faXmark,
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
import DeleteConfirmationModal from "../DeletConfirmation/DeletConfirmation";

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
    setTheme(theme === "dark" ? "light" : "dark");
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

      {/* <ul className="menu bg-base-100 border border-l-0 border-t-0 border-b-0  h-screen justify-between">
        <li className="">
          <FontAwesomeIcon icon={faHouse} />
        </li>
        <li>
          <FontAwesomeIcon icon={faQuoteRight} />
        </li>
        <li>
          <FontAwesomeIcon icon={faImage} />
        </li>
        <li>
          <FontAwesomeIcon icon={faCode} />
        </li>
        <li>
          <FontAwesomeIcon icon={faUpload} />
        </li>
      </ul> */}
      {/*  */}
      <div className="drawer  ">
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
              // icon={faArrowRight}
              icon={faAnglesRight}
              onClick={toggleDrawer}
              className="hidden lg:hidden"
            />
          </label>

          {children}
        </div>
        {/*  */}

        {/*  */}
        <div className="drawer-side bg-base-100 sm: w-3/4 lg:w-1/5 flex flex-col p-4 outline outline-1 outline-base-200">
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
                  icon={faAnglesLeft}
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

          <ul className="menu  w-full mt-10">
            {posts.map((post) => (
              <li key={post._id} className="flex justify-between flex-row">
                <div className="flex-1 overflow-hidden items-center">
                  <FontAwesomeIcon icon={faFile} />
                  <Link
                    href={`/post/${post._id}`}
                    className="truncate font-bold"
                  >
                    {post.topic}
                  </Link>
                </div>

                {/* <FontAwesomeIcon icon={faTrash} /> */}
                {/* <div> */}
                {/* <FontAwesomeIcon icon={faXmark} /> */}
                {/* <DeleteConfirmationModal onDelete={handleDeleteConfirm} /> */}
                {/* </div> */}
              </li>
            ))}
            {!noMorePosts && (
              <div
                onClick={() => {
                  getPosts({ lastPostDate: posts[posts.length - 1].create });
                }}
                className="btn btn-xs mt-10 capitalize"
              >
                {/* <FontAwesomeIcon icon={faArrowDown} /> */}
                <div>Load more posts</div>
              </div>
            )}
          </ul>
          <div className="divider"></div>
          {/* <div className="flex flex-col "> */}
          <ul className="menu w-full">
            <li className="">
              <div>
                <FontAwesomeIcon icon={faCoins} />
                <div className="">Buy Tokens</div>
                <Link href="/token-topup">
                  <div
                    className={`font-bold ${
                      availableTokens >= 50
                        ? "text-success"
                        : availableTokens <= 25
                        ? "text-warning"
                        : availableTokens < 10
                        ? " text-error"
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

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 swap-off"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 swap-on"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                </label>
              </div>
            </li>
            {/* <li>
              <div>
                <FontAwesomeIcon icon={faLanguage} />
                <div className="">Language</div>
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
              </div>
            </li> */}
            <li>
              {!!user ? (
                <div>
                  {/* <Image
                    src={user.picture}
                    alt={user.name}
                    height={20}
                    width={20}
                    className="rounded-full"
                  /> */}
                  <FontAwesomeIcon icon={faUser} />
                  <div className="">{user.name}</div>
                  <Link href="/api/auth/logout">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
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
