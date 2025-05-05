import { FaBell, FaSms } from "react-icons/fa";
import "../../assets/css/header.css";
import { useAppContext } from "../../context/AppContext";
import { POSITION_OPTIONS, STATUS_OPTIONS } from "../../core/const";
import Button from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import SearchField from "../../UI/SearchField";
import { useEffect, useState } from "react";
import { applyFilters } from "../../utils/_function";

const Header = () => {
  const { activeItem, setModalState, setListings,listing } = useAppContext();
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [_leaveStatus, setLeaveStatus] = useState("");
  const [tempList, setTempList] = useState([]);

useEffect(() => {
  if (tempList.length === 0) {
    setTempList(listing);
  }
}, [listing]);

const handleDropdownChange = (value: string, key: string) => {
  if (key === "status") setStatus(value);
  if (key === "position") setPosition(value);
  if (key === "attendance") setAttendanceStatus(value);
  if (key === "leave") setLeaveStatus(value);

  const updatedFilters = {
    status: key === "status" ? value : "",
    position: key === "position" ? value : "",
    attendance: key === "attendance" ? value : "",
    leave: key === "leave" ? value : "",
  };

  applyFilters(updatedFilters, setListings, tempList);
};

  return (
    <div className="header-container">
      {/* Top Header */}
      <div className="header-top">
        <h2 className="page-title">{activeItem}</h2>
        <div className="header-actions">
          <FaSms className="icon" />
          <FaBell className="icon" />
          <div className="profile-dropdown">
            <img
              src="https://unsplash.com/photos/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs"
              alt="profile"
              className="profile-img"
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="header-bottom">
        {/* Render two dropdowns if activeItem is Candidates */}
        {activeItem === "Candidates" && (
          <>
            <div className="search-add">
              <Dropdown
                options={STATUS_OPTIONS[activeItem]}
                value={status}
                onChange={(val: string) => handleDropdownChange(val, "status")}
                placeholder="Status"
              />
              <Dropdown
                options={POSITION_OPTIONS[activeItem]}
                value={position}
                onChange={(val: string) => handleDropdownChange(val, "position")}
                placeholder="Position"
              />
            </div>
          </>
        )}

        {/* Render a single dropdown for other sections */}
        {activeItem == "Employees" && (
          <>
            <Dropdown
              options={STATUS_OPTIONS[activeItem]}
              value={position}
              onChange={(val: string) => handleDropdownChange(val, "position")}
              placeholder="Status"
            />
          </>
        )}
        {activeItem == "Attendance" && (
          <>
            <Dropdown
              options={STATUS_OPTIONS[activeItem]}
              value={attendanceStatus}
              onChange={(val: string) => handleDropdownChange(val, "attendance")}
              placeholder="Status"
            />
          </>
        )}
          {activeItem == "Leave" && (
          <>
            <Dropdown
              options={STATUS_OPTIONS[activeItem]}
              value={attendanceStatus}
              onChange={(val: string) => handleDropdownChange(val, "leave")}
              placeholder="Status"
            />
          </>
        )}

        {/* Add Contact button for Candidates and Leave */}
        <div className="search-add">
          <SearchField handleUserClick={setListings} />

          {(activeItem === "Candidates" || activeItem === "Leave") && (
            <Button
              className="add-btn"
              onClick={() => setModalState({ status: true, data: undefined })}
            >
              {activeItem === "Candidates" ? "Add Candidate" : "Add Leave"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
