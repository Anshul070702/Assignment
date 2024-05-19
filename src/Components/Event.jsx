import React, { useState } from "react";
import Select, { components } from "react-select";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiNoteBlankBold } from "react-icons/pi";
import DateTimeRangePicker from "./DateTimePicker";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { options } from "../Constants/options";


const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "240px",
    minHeight: "60px",
    borderRadius: "240px",
    borderColor: "#ccc",
    display: "flex",
    alignItems: "center",
    padding: "2px 8px",
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    width: "240px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0px 4px",
    color: "black",
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
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "16px",
  },
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    color: "#007F73",
    fontSize: "20px",
    fontWeight: "bold",
    paddingLeft: "2px",
  }),
  singleValueImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
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
    {props.data.label}
  </components.SingleValue>
);

const DropdownIndicator = (props) => {
  const { selectProps } = props;
  const isOpen = selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
    </components.DropdownIndicator>
  );
};

const App = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [note, setNote] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-96">
        {!clicked ? (
          <FaPlus
            onClick={handleClick}
            className=" text-red-500 h-6 w-6 mb-4"
          />
        ) : (
          <div className=" py-4 flex items-center justify-between">
            <FaRegCircleCheck className="text-red-500 h-8 w-8 " />
            <div className="flex items-center">
              <div className="mr-2">
                <FaTrashCan className="text-red-500 h-8 w-8" />
              </div>
              <RxCross2
                onClick={handleClick}
                className="text-red-500 h-6 w-6"
              />
            </div>
          </div>
        )}
        {clicked ? (
          <>
            {/* Event Name */}
            <div className="w-full ">
              <div className="flex items-center justify-center py-2">
                <input
                  type="text"
                  className="px-8 h-16 w-full border border-[#ccc] rounded-full  text-3xl text-red-500 center font-bold"
                />
              </div>
              {/* Date Time Picker */}
              <div className="flex items-center justify-center py-8 h-16 w-full border border-[#ccc] rounded-full font-bold">
                <DateTimeRangePicker />
              </div>
              {/* Assign to: */}
              <div className="flex items-center justify-center space-x-4 py-8">
                <FaRegUser className="text-red-400 w-8 h-8" />
                <p className="italic text-xl text-gray-600">Assign to:</p>
                <Select
                  options={options}
                  value={selectedOption}
                  onChange={handleChange}
                  components={{
                    Option: CustomOption,
                    SingleValue: SingleValue,
                    DropdownIndicator,
                  }}
                  styles={customStyles}
                  classNamePrefix="react-select"
                  menuIsOpen={menuIsOpen}
                  onMenuOpen={() => setMenuIsOpen(true)}
                  onMenuClose={() => setMenuIsOpen(false)}
                />
              </div>
              {/* Note Section */}
              <div className="flex items-center justify-center space-x-4">
                <PiNoteBlankBold className="text-red-400 w-8 h-8" />
                <p className="italic text-xl text-gray-600">Note:</p>
                <textarea
                  value={note}
                  onChange={handleNoteChange}
                  className="h-24 w-72 border border-[#ccc] rounded-3xl text-2xl p-4 text-gray-600 resize-none"
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
