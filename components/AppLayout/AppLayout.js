import { useUser } from "@auth0/nextjs-auth0/client";
import {
  faArrowLeft,
  faArrowRight,
  faCoins,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import PostsContext from "../../context/postsContext";
// import { Logo } from "../Logo";

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

          <ul className="menu bg-base-200 w-full mt-10">
            {posts.map((post) => (
              <li key={post._id}>
                <Link href={`/post/${post._id}`}>{post.topic}</Link>
              </li>
            ))}
            {!noMorePosts && (
              <div
                onClick={() => {
                  getPosts({ lastPostDate: posts[posts.length - 1].create });
                }}
                className="hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4"
              >
                Load more posts
              </div>
            )}
          </ul>
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              {!!user ? (
                <>
                  <div className="flex justify-between items-center">
                    <Image
                      src={user.picture}
                      alt={user.name}
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                    <div className="font-bold">{user.name}</div>
                  </div>
                  <div className="flex-1">
                    <Link className="text-sm" href="/api/auth/logout">
                      Logout
                    </Link>
                  </div>
                </>
              ) : (
                <Link href="/api/auth/login">Login</Link>
              )}

              <progress
                className={`progress ${
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
              <div className="card-actions justify-end mt-10">
                <Link href="/token-topup">
                  <div className="indicator">
                    <span
                      className={`indicator-item ${
                        availableTokens >= 50
                          ? "badge badge-success"
                          : availableTokens <= 25
                          ? "badge badge-warning"
                          : availableTokens < 10
                          ? "badge badge-error"
                          : ""
                      }`}
                    >
                      {availableTokens}
                    </span>
                    <button className="btn btn-primary ">buy tokens</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
    //   <div className="flex flex-col text-white overflow-hidden">
    //     <div className="bg-slate-800 px-2">
    //       {/* <Logo /> */}
    //       <Link href="/post/new" className="btn">
    //         New post
    //       </Link>
    //       <Link href="/token-topup" className="block mt-2 text-center">
    //         <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
    //         <span className="pl-1">{availableTokens} tokens available</span>
    //       </Link>
    //     </div>
    //     <div className="px-4 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800">
    //       {posts.map((post) => (
    //         <Link
    //           key={post._id}
    //           href={`/post/${post._id}`}
    //           className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
    //             postId === post._id ? "bg-white/20 border-white" : ""
    //           }`}
    //         >
    //           {post.topic}
    //         </Link>
    //       ))}
    //       {!noMorePosts && (
    //         <div
    //           onClick={() => {
    //             getPosts({ lastPostDate: posts[posts.length - 1].create });
    //           }}
    //           className="hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4"
    //         >
    //           Load more posts
    //         </div>
    //       )}
    //     </div>
    //     <div className="bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
    //       {!!user ? (
    //         <>
    //           <div className="min-w-[50px]">
    //             <Image
    //               src={user.picture}
    //               alt={user.name}
    //               height={50}
    //               width={50}
    //               className="rounded-full"
    //             />
    //           </div>
    //           <div className="flex-1">
    //             <div className="font-bold">{user.email}</div>
    //             <Link className="text-sm" href="/api/auth/logout">
    //               Logout
    //             </Link>
    //           </div>
    //         </>
    //       ) : (
    //         <Link href="/api/auth/login">Login</Link>
    //       )}
    //     </div>
    //   </div>
    //   {children}
    // </div>
  );
};
