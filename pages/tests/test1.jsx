import {
  faArrowRotateLeft,
  faEllipsis,
  faPenNib,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const DropdownParagraph = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="mt-10 h-96 bg-base-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative ml-32">
        <div
          className={`${
            isHovered ? "dropdown" : "hidden"
          } absolute -left-10 top-1/2 transform -translate-y-1/2`}
        >
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>

    // <div className="relative">
    // <div
    //   className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
    //     isHovered ? 'opacity-100' : 'opacity-0'
    //   } transition-opacity duration-300`}
    // >
    //   <button className="bg-blue-500 text-white rounded-full p-2">
    //     {/* Add your icon here */}
    //   </button>
    // </div>
    // <p
    //   className="pl-10"
    //   onMouseEnter={handleHover}
    //   onMouseLeave={handleMouseLeave}
    // >
    //   {/* Your paragraph content */}
    // </p>
    // </div>
  );
};

export default DropdownParagraph;
