import { Editor } from "@tiptap/core";
import { AiOutlineCheck } from "react-icons/ai";
import { BiSolidChevronDown } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";

import { Dispatch, FC, SetStateAction } from "react";

export interface BubbleColorMenuItem {
  name: string;
  color: string | null;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "#000000",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "#ffffff",
  },
  {
    name: "Purple",
    color: "#F6F3F8",
  },
  {
    name: "Red",
    color: "#FDEBEB",
  },
  {
    name: "Yellow",
    color: "#FEF9C3",
  },
  {
    name: "Blue",
    color: "#E6F3F7",
  },
  {
    name: "Green",
    color: "#EDF3EC",
  },
  {
    name: "Orange",
    color: "#FAEBDD",
  },
  {
    name: "Pink",
    color: "#FAF1F5",
  },
  {
    name: "Gray",
    color: "#F1F1EF",
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <div className="relative h-full">
      <button
        className="flex h-full items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="rounded-sm px-1"
          style={{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }}
        >
          <MdOutlineColorLens />
        </span>

        <BiSolidChevronDown className="h-4 w-4 " />
      </button>

      {isOpen && (
        <section className="menu bg-base-200 rounded-md fixed top-full z-[99999] mt-1 flex  flex-col overflow-hidden  animate-in fade-in slide-in-from-top-1">
          <ul className="menu bg-base-200 w-56 rounded-box p-0 m-0 ">
            <li>
              <details>
                <summary>Color</summary>
                {TEXT_COLORS.map(({ name, color }, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      editor.commands.unsetColor();
                      name !== "Default" &&
                        editor.chain().focus().setColor(color).run();
                      setIsOpen(false);
                    }}
                    className="flex h-full items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300"
                  >
                    <div className="flex items-center space-x-2 ">
                      <div
                        className="rounded-sm px-1 py-px font-medium "
                        style={{ color }}
                      >
                        A
                      </div>
                      <span>{name}</span>
                    </div>
                    {editor.isActive("textStyle", { color }) && (
                      <AiOutlineCheck className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </details>
            </li>
            <li>
              <details>
                <summary>Background Color</summary>
                {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      editor.commands.unsetHighlight();
                      name !== "Default" &&
                        editor.commands.setHighlight({ color });
                      setIsOpen(false);
                    }}
                    className="flex h-full items-center gap-1 p-2 text-sm font-medium rounded-md hover:bg-base-300 active:bg-base-300"
                  >
                    <div className="flex items-center space-x-2 ">
                      <div
                        className="rounded-sm  px-1 py-px font-medium text-base-content "
                        style={{ backgroundColor: color }}
                      >
                        A
                      </div>
                      <span>{name}</span>
                    </div>
                    {editor.isActive("highlight", { color }) && (
                      <AiOutlineCheck className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </details>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};
