import { Editor } from "@tiptap/core";
import {
  BsCheck2Square,
  BsCodeSlash,
  BsQuote,
  BsTextParagraph,
} from "react-icons/bs";
import {
  AiOutlineCheck,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { BiSolidChevronDown } from "react-icons/bi";
import { Dispatch, FC, SetStateAction } from "react";

import { BubbleMenuItem } from "./EditorBubbleMenu";

interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Text",
      icon: BsTextParagraph,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: LuHeading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: LuHeading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: LuHeading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "To-do List",
      icon: BsCheck2Square,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskItem"),
    },
    {
      name: "Bullet List",
      icon: AiOutlineUnorderedList,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: AiOutlineOrderedList,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: BsQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      name: "Code",
      icon: BsCodeSlash,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };

  return (
    <div className="relative h-full">
      <button
        className="flex h-full items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{activeItem?.name}</span>
        <BiSolidChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <section className="menu bg-base-200 rounded-md fixed top-full z-[99999] mt-1 flex  flex-col overflow-hidden  p-2  animate-in fade-in slide-in-from-top-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className="flex items-center justify-between  px-2 py-1 rounded-md hover:bg-base-300"
            >
              <div className="flex items-center space-x-2 ">
                <div className="  p-1">
                  <item.icon className="h-3 w-3 text-base-content" />
                </div>
                <span className="text-base-content">{item.name}</span>
              </div>
              {activeItem.name === item.name && (
                <AiOutlineCheck className="h-4 w-4" />
              )}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
