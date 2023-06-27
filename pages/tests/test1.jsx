import { useState } from "react";

const EditableParagraph = ({ initialText }) => {
  const [editing, setEditing] = useState(false);
  const [currentText, setCurrentText] = useState(initialText);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handlePrint = () => {
    console.log(currentText);
  };

  const handleSave = () => {
    setEditing(false);
    setModalOpen(false);
  };

  const handleChange = (event) => {
    setCurrentText(event.target.value);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded"
        onClick={openModal}
      >
        View
      </button>
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded">
            {editing ? (
              <textarea
                className="w-full h-full bg-transparent outline-none resize-none"
                value={currentText}
                onChange={handleChange}
              />
            ) : (
              <p>{currentText}</p>
            )}
            <div className="mt-4">
              {!editing && (
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
              {!editing && (
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  onClick={handlePrint}
                >
                  Print
                </button>
              )}
              {editing && (
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </div>
          </div>
          <button
            className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
      {!editing && !modalOpen && <p>{currentText}</p>}
    </div>
  );
};

const App = () => {
  const paragraphs = [
    "First paragraph.",
    "Second paragraph.",
    "Third paragraph.",
  ];

  return (
    <div>
      {paragraphs.map((text, index) => (
        <EditableParagraph key={index} initialText={text} />
      ))}
    </div>
  );
};

export default App;
// import { useState } from "react";

// function EditableText() {
//   const [editing, setEditing] = useState(false);
//   const [text, setText] = useState("Initial long text that exceeds the width");

//   function handleEdit() {
//     setEditing(true);
//   }

//   function handleSave() {
//     setEditing(false);
//     // Perform save or update operation with the updated text
//   }

//   function handleCancel() {
//     setEditing(false);
//   }

//   function handleTextChange(event) {
//     setText(event.target.value);
//   }

//   if (editing) {
//     return (
//       <div>
//         <textarea
//           className="resize-none overflow-hidden border rounded p-2"
//           style={{ height: "auto", width: "100%" }}
//           value={text}
//           onChange={handleTextChange}
//           rows={Math.ceil(text.length / 40)} // Adjust row height based on the content length
//         />
//         <div className="mt-2">
//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <p className="border rounded p-2 overflow-hidden">
//         {text.length > 40 ? `${text.slice(0, 100)}...` : text}
//       </p>
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
//         onClick={handleEdit}
//       >
//         Edit
//       </button>
//     </div>
//   );
// }

// export default EditableText;
