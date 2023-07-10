"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
import useLocalStorage from "../../../lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
import { EditorBubbleMenu } from "./components";
import { BsFillCheckSquareFill, BsFillSquareFill } from "react-icons/bs";

export default function Editor() {
  const [htmlObject, setHtmlObject] = useState(null);
  const [content, setContent] = useLocalStorage("content", null);

  useEffect(() => {
    const fetchHtmlObject = async () => {
      try {
        const html = `<h1>HEADING 1</h1><h2>Amir Najsfi</h2><ul><li>list item 1</li><li>list item 2</li></ul>`;
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
    };

    fetchHtmlObject();
  }, []);

  useEffect(() => {
    if (htmlObject !== null) {
      setContent(htmlObject);
    }
  }, [htmlObject]);

  const DEFAULT_EDITOR_CONTENT = content;

  const [saveStatus, setSaveStatus] = useState("Saved");

  const [hydrated, setHydrated] = useState(false);

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
    const onKeyDown = (e: KeyboardEvent) => {
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
    const mousedownHandler = (e: MouseEvent) => {
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
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <div className="overflow-auto min-h-screen">
      <div className="max-w-screen-md mx-auto">
        <div
          onClick={() => {
            editor?.chain().focus().run();
          }}
          className="card min-h-[500px] w-full max-w-screen-lg p-12 px-8 sm:mb-[calc(20vh)] "
        >
          <div className="absolute right-5 top-5 w-32">
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
          </div>
          {editor && <EditorBubbleMenu editor={editor} />}
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
