import React, { useState } from "react";
import { TbSend2 } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import Select, { components } from "react-select";
import { options } from "../Constants/options";

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    borderRadius: "full",
    borderColor: "transparent",
    display: "flex",
    alignItems: "center",
    padding: "2px 8px",
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  option: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "8px",
    fontSize: "16px",
  }),
  optionImage: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  }),
  singleValueImage: {
    width: "60px",
    height: "40px",
    borderRadius: "50%",
  },
};

const CustomOption = (props) => (
  <components.Option {...props}>
    <img
      src={props.data.src}
      alt={props.data.value}
      style={customStyles.optionImage}
    />
    {props.data.label}
  </components.Option>
);

const SingleValue = (props) => (
  <components.SingleValue {...props}>
    <img
      src={props.data.src}
      alt={props.data.value}
      style={customStyles.singleValueImage}
    />
  </components.SingleValue>
);

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedUser, setSelectedUser] = useState(options[0]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, user: selectedUser }]);
      setNewComment("");
    }
  };

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditingText(comments[index].text);
  };

  const handleSaveComment = () => {
    const updatedComments = [...comments];
    updatedComments[editingIndex] = {
      ...updatedComments[editingIndex],
      text: editingText,
    };
    setComments(updatedComments);
    setEditingIndex(null);
    setEditingText("");
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-100 p-4 rounded-3xl w-[400px]">
        <h2 className="italic text-gray-600 text-xl font-bold mb-4">
          Comments
        </h2>
        <ul>
          {comments.map((comment, index) => (
            <li
              key={index}
              className="flex items-start text-[#007F73] justify-between border-b py-2"
            >
              {editingIndex === index ? (
                <div className="flex w-full items-center">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button
                    onClick={handleSaveComment}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-shrink-0">
                    <img
                      src={comment.user.src}
                      alt={comment.user.value}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex-grow mx-4">
                    <span className="font-bold block">
                      {comment.user.label}
                    </span>
                    <span className="text-gray-500">{comment.text}</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditComment(index)}
                      className="mr-2 text-blue-500"
                    >
                      <MdModeEdit className="text-red-500 h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(index)}
                      className="text-red-500"
                    >
                      <FaRegTrashCan className="text-red-500 h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <div className="flex justify-around items-center">
            <div className="flex items-center">
              <Select
                options={options}
                value={selectedUser}
                onChange={setSelectedUser}
                components={{ Option: CustomOption, SingleValue: SingleValue }}
                styles={customStyles}
                classNamePrefix="react-select"
                menuIsOpen={menuIsOpen}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                onFocus={() => setMenuIsOpen(true)}
                onBlur={() => setMenuIsOpen(false)}
              />
            </div>
            <div className="flex items-center justify-between w-full ml-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="rounded-l-full h-10 px-4 py-1 w-full"
                placeholder="Write a comment.."
              />
              <button
                onClick={handleAddComment}
                className="bg-white text-white px-4 py-1 rounded-r-full"
              >
                <TbSend2 className="rounded-3xl text-red-400 w-8 h-8 bg-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
