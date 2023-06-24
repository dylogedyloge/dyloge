import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppLayout } from "../../components/AppLayout";

import EditDropDown from "@/components/EditDropDown/EditDropDown";
import PostsContext from "../../context/postsContext";
import clientPromise from "../../lib/mongodb";
import { getAppProps } from "../../utils/getAppProps";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagic } from "@fortawesome/free-solid-svg-icons";

export default function Post(props) {
  // console.log("PROPS: ", props);
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deletePost } = useContext(PostsContext);

  // Add button with mouseover
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const renderParagraph = (node, index) => {
    const isHovered = index === hoveredIndex;

    return (
      <p
        key={index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {isHovered && (
          <div className="absolute -left-14 top-0 transform -translate-y-1/2 mt-3 z-10">
            <EditDropDown />
          </div>
        )}
        {node}
      </p>
    );
  };

  const parseContent = (content) => {
    const parsed = ReactHtmlParser(content, {
      transform: (node, index) => {
        if (node.type === "tag" && node.name === "p") {
          const cleanedChildren = node.children.map((child) =>
            child.type === "text" ? child.data : ""
          );
          return renderParagraph(cleanedChildren.join(""), index);
        }
        return null;
      },
    });

    return parsed;
  };

  const parsedContent = parseContent(props.postContent);

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/deletePost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: props.id }),
      });
      const json = await response.json();
      if (json.success) {
        deletePost(props.id);
        router.replace(`/post/new`);
      }
    } catch (e) {}
  };

  return (
    <div className="overflow-auto min-h-screen px-6 ">
      <div className="max-w-screen-md mx-auto">
        <div className="card  p-10">
          <div className="card-title mb-6">{props.title}</div>
          <div className="mb-10 text-justify">{props.metaDescription}</div>
          <div className="font-bold">Keywords</div>
          <div className="">
            {props.keywords.split(",").map((keyword, i) => (
              <div key={i} className="">
                {keyword}
              </div>
            ))}
          </div>
        </div>
        <div className="prose prose-img:rounded-xl">{parsedContent}</div>

        <div className="my-4">
          {!showDeleteConfirm && (
            <button
              className="btn bg-red-600 hover:bg-red-700"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete post
            </button>
          )}
          {!!showDeleteConfirm && (
            <div>
              <p className="p-2 bg-red-300 text-center">
                Are you sure you want to delete this post? This action is
                irreversible
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn bg-stone-600 hover:bg-stone-700"
                >
                  cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="btn bg-red-600 hover:bg-red-700"
                >
                  confirm delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("BlogStandard");
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });

    if (!post) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        id: ctx.params.postId,
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postCreated: post.create.toString(),
        ...props,
      },
    };
  },
});
