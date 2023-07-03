import {
  faArrowRotateLeft,
  faEllipsis,
  faPenNib,
  faRepeat,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";

const EditDropDown = ({ node, props }) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [currentText, setCurrentText] = useState(node.children[0].data);
  const [regenerating, setRegenerating] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRegenerate = async () => {
    // console.log(currentText);
    //   e.preventDefault();
    setRegenerating(true);
    try {
      const response = await fetch(`/api/regenerate`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ currentText }),
      });
      console.log(response);
    } catch (e) {
      setRegenerating(false);
    }
  };

  const handleSaveContent = async () => {
    try {
      const response = await fetch(`/api/getPostById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: props.id,
        }),
      });
      const data = await response.json();
      const postContent = data.content;

      const editedContent = postContent.replace(
        node.children[0].data,
        currentText
      );
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
        console.log("Content saved successfully.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleChange = (event) => {
    setCurrentText(event.target.value);
  };

  return (
    <div>
      <button
        className="btn btn-ghost btn-xs cursor-pointer"
        onClick={() => window.my_modal_5.showModal()}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
      <dialog id="my_modal_5" className="z-10 modal modal-middle ">
        <form method="dialog" className="modal-box ">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {editing ? (
            <div className="flex flex-col justify-between items-center gap-6 mt-10  ">
              <textarea
                className="textarea w-full h-96 prose "
                value={currentText}
                onChange={handleChange}
              ></textarea>
              <button
                className="btn btn-block btn-neutral"
                onClick={handleSaveContent}
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-justify whitespace-normal prose">
              {currentText}
            </p>
          )}
          {!editing && (
            <div className="flex justify-around items-center">
              <a
                className="btn no-underline capitalize"
                onClick={handleRegenerate}
              >
                <FontAwesomeIcon icon={faRepeat} />
                <div className=" hidden sm:block">Regenerate</div>
              </a>
              <a className="btn no-underline capitalize" onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenNib} />
                <div className=" hidden sm:block">Edit</div>
              </a>
              <a
                className="btn no-underline capitalize"
                onClick={handleRegenerate}
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} />
                <div className="hidden sm:block">Rephrase</div>
              </a>
            </div>
          )}
        </form>
      </dialog>
    </div>
  );
};

export default EditDropDown;
