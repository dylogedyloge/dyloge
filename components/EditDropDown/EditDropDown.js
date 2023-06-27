import {
  faArrowRotateLeft,
  faEllipsis,
  faPenNib,
  faRepeat,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const EditDropDown = ({ node, onUpdateContent, onSaveContent }) => {
  const [editing, setEditing] = useState(false);
  const [currentText, setCurrentText] = useState(node.children[0].data);

  const handleEdit = () => {
    setEditing(true);
  };

  const handlePrint = () => {
    console.log(currentText);
  };

  const handleSave = () => {
    setEditing(false);
    onSaveContent(currentText);
    onUpdateContent(currentText);
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
            <FontAwesomeIcon icon={faTimes} />
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
                onClick={handleSave}
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
              <a className="btn no-underline capitalize" onClick={handlePrint}>
                <FontAwesomeIcon icon={faRepeat} />
                <div>Regenerate</div>
              </a>
              <a className="btn no-underline capitalize" onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenNib} />
                <div>Edit</div>
              </a>
              <a className="btn no-underline capitalize" onClick={handlePrint}>
                <FontAwesomeIcon icon={faArrowRotateLeft} />
                <div>Rephrase</div>
              </a>
            </div>
          )}
        </form>
      </dialog>
    </div>
  );
};

export default EditDropDown;
