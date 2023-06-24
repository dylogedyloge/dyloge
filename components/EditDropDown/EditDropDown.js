import {
  faArrowRotateLeft,
  faEllipsis,
  faPenNib,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EditDropDown = () => {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-xs">
        <FontAwesomeIcon icon={faEllipsis} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className="flex">
          <a>
            <FontAwesomeIcon icon={faRepeat} />

            <div>Regenerate</div>
          </a>
        </li>
        <li>
          <a>
            <FontAwesomeIcon icon={faPenNib} />

            <div>Manual Edit</div>
          </a>
        </li>
        <li>
          <a>
            <FontAwesomeIcon icon={faArrowRotateLeft} />

            <div>Rephrase</div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default EditDropDown;
