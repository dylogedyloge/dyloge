import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";
import { AppLayout } from "../../components/AppLayout";
import DeleteConfirmationModal from "@/components/DeletConfirmation/DeletConfirmation";
import EditDropDown from "@/components/EditDropDown/EditDropDown";
import PostsContext from "../../context/postsContext";
import clientPromise from "../../lib/mongodb";
import { getAppProps } from "../../utils/getAppProps";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { FileIcon, defaultStyles } from "react-file-icon";

export default function Post(props) {
  // console.log("PROPS: ", props);
  const router = useRouter();
  const { deletePost } = useContext(PostsContext);

  const [content, setContent] = useState(props.postContent);
  const contentRef = useRef(null);
  // Apply changes

  const handleApplyChanges = () => {
    location.reload();
  };

  // Download
  const handleDownload = async (format) => {
    const content = contentRef.current.innerHTML;

    switch (format) {
      case "txt":
        const plainText = content.replace(/<[^>]+>/g, "");
        const txtBlob = new Blob([plainText], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(txtBlob, `page.txt`);
        break;
      case "mdx":
        const mdxContent = `---
title: page
---

${content}`;
        const mdxBlob = new Blob([mdxContent], {
          type: "text/markdown;charset=utf-8",
        });
        saveAs(mdxBlob, `page.mdx`);

        break;
      case "docx":
        // Generate DOCX and download
        const docxContent = `<html><body>${content}</body></html>`;
        const docxFile = new Blob([docxContent], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(docxFile, `page.docx`);
        break;
      default:
        break;
    }
  };

  // Add button with mouseover
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const renderNode = (node, index) => {
    const isHovered = index === hoveredIndex;

    if (node.type === "tag") {
      const { name, children, attribs, ...rest } = node;
      const Tag = name;

      if (
        Tag === "p" ||
        Tag.startsWith("h") ||
        Tag === "span" ||
        Tag === "div"
      ) {
        const tagContent = (
          <React.Fragment>
            {children && children.map((child, i) => renderNode(child, i))}
          </React.Fragment>
        );

        return (
          <React.Fragment key={index}>
            <div
              className={`relative ${isHovered ? "z-10" : ""}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {isHovered && (
                <div className="absolute -left-4 top-4 transform -translate-y-full mt-3">
                  <EditDropDown
                    node={node}
                    props={props}
                    className="absolute -left-4 top-4 transform -translate-y-full mt-3"
                  />
                </div>
              )}
              <Tag {...attribs} className={isHovered ? "relative" : ""}>
                {tagContent}
              </Tag>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <Tag
            {...attribs}
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {children && children.map((child, i) => renderNode(child, i))}
          </Tag>
        );
      }
    }

    if (node.type === "text") {
      return node.data;
    }

    return null;
  };

  const parseContent = (content) => {
    const parsed = ReactHtmlParser(content, {
      transform: (node, index) => {
        return renderNode(node, index);
      },
    });

    return parsed;
  };

  const parsedContent = parseContent(content);

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
    <div className="overflow-auto min-h-screen">
      <div className="max-w-screen-md mx-auto">
        <div className="card  p-10">
          <div className="card-title text-2xl font-bold mt-4 mb-6 ">
            {props.title}
          </div>
          <div className="mb-10 text-justify prose">
            {props.metaDescription}
          </div>
          <div className="font-bold prose">Keywords</div>
          <div>
            {props.keywords.split(",").map((keyword, i) => (
              <div key={i} className="prose">
                {keyword}
              </div>
            ))}
          </div>
        </div>
        <div
          className="prose prose-img:rounded-xl p-10 max-w-screen-md"
          ref={contentRef}
        >
          {parsedContent}
        </div>
        <div className="px-10">
          <div
            className="btn btn-block capitalize"
            onClick={handleApplyChanges}
          >
            Apply Changes
          </div>
        </div>

        <div className="p-10 flex justify-between">
          <DeleteConfirmationModal onDelete={handleDeleteConfirm} />
          <div
            className="tooltip tooltip-left capitalize"
            data-tip="regenerate"
          >
            <button className="btn ">
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </div>
          <div className="dropdown  dropdown-top dropdown-end">
            <div
              className="tooltip tooltip-left capitalize"
              data-tip="download"
            >
              <label tabIndex={0} className="btn m-1">
                <FontAwesomeIcon icon={faDownload} />
              </label>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit "
            >
              <div className="tooltip tooltip-left " data-tip=".txt">
                <li>
                  <a
                    onClick={() => handleDownload("txt")}
                    className="flex justify-between items-center w-16 "
                  >
                    <FileIcon extension="txt" {...defaultStyles.txt} />
                  </a>
                </li>
              </div>
              <div className="tooltip tooltip-left " data-tip=".mdx">
                <li>
                  <a
                    onClick={() => handleDownload("mdx")}
                    className="flex justify-between items-center w-16 "
                  >
                    <FileIcon extension="mdx" {...defaultStyles.mdx} />
                  </a>
                </li>
              </div>
              <div className="tooltip tooltip-left " data-tip=".docx">
                <li>
                  <a
                    onClick={() => handleDownload("docx")}
                    className="flex justify-between items-center w-16 "
                  >
                    <FileIcon extension="docx" {...defaultStyles.docx} />
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     const props = await getAppProps(ctx);
//     const userSession = await getSession(ctx.req, ctx.res);
//     const client = await clientPromise;
//     const db = client.db("BlogStandard");
//     const user = await db.collection("users").findOne({
//       auth0Id: userSession.user.sub,
//     });
//     const post = await db.collection("posts").findOne({
//       _id: new ObjectId(ctx.params.postId),
//       userId: user._id,
//     });

//     if (!post) {
//       return {
//         redirect: {
//           destination: "/post/new",
//           permanent: false,
//         },
//       };
//     }

//     return {
//       props: {
//         id: ctx.params.postId,
//         postContent: post.postContent,
//         title: post.title,
//         metaDescription: post.metaDescription,
//         keywords: post.keywords,
//         postCreated: post.create.toString(),
//         ...props,
//       },
//     };
//   },
// });
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
