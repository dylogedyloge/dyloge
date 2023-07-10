"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getAppProps } from "../../../../utils/getAppProps";
import { AppLayout } from "../../../../components/AppLayout";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
// import useLocalStorage from "../../../../lib/hooks/use-local-storage";
import DeleteConfirmationModal from "../../../../components/DeletConfirmation/DeletConfirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FileIcon, defaultStyles } from "react-file-icon";
import { saveAs } from "file-saver";
import PostsContext from "../../../../context/postsContext";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
import { EditorBubbleMenu } from "./components";
import { BsFillCheckSquareFill, BsFillSquareFill } from "react-icons/bs";
import { useRouter } from "next/router";

import { BiSolidErrorCircle } from "react-icons/bi";

export default function Editor(props) {
  const [htmlObject, setHtmlObject] = useState(null);
  // const [content, setContent] = useLocalStorage("content", null);
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchHtmlObject = async () => {
      try {
        const html = props.postContent;
        const response = await fetch("/api/htmlToObject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ html }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch HTML object");
        }
        const data = await response.json();

        setHtmlObject(data.htmlObject);
      } catch (error) {
        console.error(error);
      }
      // console.log(props.postContent);
    };

    fetchHtmlObject();
  }, [props.postContent]);

  useEffect(() => {
    if (htmlObject !== null) {
      setContent(htmlObject);
    }
  }, [htmlObject]);

  // Delete
  const router = useRouter();
  const { deletePost } = useContext(PostsContext);

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
        console.log(props.id);

        deletePost(props.id);
        router.replace(`/post/new`);
      }
    } catch (e) {}
  };

  const [saveStatus, setSaveStatus] = useState("Saved");

  // const [hydrated, setHydrated] = useState(false);

  // Download

  const handleDownload = async (format) => {
    const downladableContent = editor.getHTML();
    console.log(downladableContent);

    switch (format) {
      case "txt":
        const plainText = downladableContent.replace(/<[^>]+>/g, "");
        const txtBlob = new Blob([plainText], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(txtBlob, `page.txt`);
        break;
      case "mdx":
        const mdxContent = `---
  title: page
  ---
  
  ${downladableContent}`;
        const mdxBlob = new Blob([mdxContent], {
          type: "text/markdown;charset=utf-8",
        });
        saveAs(mdxBlob, `page.mdx`);

        break;
      case "docx":
        // Generate DOCX and download
        const docxContent = `<html><body>${downladableContent}</body></html>`;
        const docxFile = new Blob([docxContent], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(docxFile, `page.docx`);
        break;
      default:
        break;
    }
  };

  // Save Changes
  const handleSaveChanges = async () => {
    try {
      // const response = await fetch(`/api/getPostById`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     postId: props.id,
      //   }),
      // });
      // const data = await response.json();
      // const postContent = data.content;

      // const editedContent = postContent.replace(
      //   node.children[0].data,
      //   currentText
      // );
      const editedContent = editor.getHTML();
      console.log(editedContent);
      const editResponse = await fetch(`/api/editPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: props.id,
          postContent: editedContent,
        }),
      });
      const editJson = await editResponse.json();
      if (editJson.success) {
        toast.custom(() => (
          <div className="toast toast-end ">
            <div className="alert  rounded-md">
              <BsFillCheckSquareFill size={18} className="text-success" />
              <span>Content saved successfully.</span>
            </div>
          </div>
        ));
      }
    } catch (error) {
      toast.custom((t) => (
        <div className="toast toast-end ">
          <div className="alert  rounded-md">
            <BiSolidErrorCircle size={18} className="text-error" />
            <span>{error}</span>
          </div>
        </div>
      ));
    }
  };

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setSaveStatus("Saving...");
    setContent(json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 750);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = e.editor.state.doc.textBetween(
        selection.from - 2,
        selection.from,
        "\n"
      );
      if (lastTwo === "++" && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        // we're using this for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
        complete(e.editor.getText());
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track("Autocomplete Shortcut Used");
      } else {
        debouncedUpdates(e);
      }
    },
    autofocus: "end",
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate Limit Reached");
        return;
      }
    },
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        complete(editor?.getText() || "");
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (
      editor &&
      content
      //  && !hydrated
    ) {
      editor.commands.setContent(content);
      // setHydrated(true);
    }
  }, [
    editor,
    content,
    // , hydrated
  ]);

  return (
    <div className="overflow-auto min-h-screen ">
      <div className="max-w-screen-md mx-auto">
        <div
          onClick={() => {
            editor?.chain().focus().run();
          }}
          className="card min-h-[500px] w-full max-w-screen-lg p-12 sm:mb-[calc(20vh)] "
        >
          {/* <div className="absolute right-0 top-0 w-32 ">
            {saveStatus === "Saved" && (
              <button className="btn btn-ghost pointer-events-none flex justify-between items-center capitalize">
                <BsFillCheckSquareFill size={18} />
                <div className="text-xs">{saveStatus}</div>
              </button>
            )}
            {saveStatus !== "Saved" && (
              <button className="btn btn-ghost pointer-events-none flex justify-between items-center capitalize">
                <BsFillSquareFill size={18} />
                <div className="text-xs">{saveStatus}</div>
              </button>
            )}
          </div> */}
          <div className="card outline outline-1 p-10 mb-32">
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
          {editor && <EditorBubbleMenu editor={editor} />}
          <EditorContent editor={editor} className="prose " />
        </div>
        {/* Actions */}
        <div className="px-10 -mt-32">
          <div
            className="btn  btn-block capitalize "
            onClick={handleSaveChanges}
          >
            <div>Save changes</div>
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
Editor.getLayout = function getLayout(page, pageProps) {
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
