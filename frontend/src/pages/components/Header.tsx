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
  const { activeItem, setModalState, setListings, listing } = useAppContext();
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [_leaveStatus, setLeaveStatus] = useState("");
  const [tempList, setTempList] = useState([]);

  useEffect(() => {
    if (tempList.length === 0 && listing.length > 0) {
      setTempList([...listing]); // clone just to be safe
    }
  }, [listing]);

  const handleDropdownChange = (value: string, key: string) => {
    console.log(value, key, 'mnbbvv');
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

  // Reset all dropdown values on activeItem change
  useEffect(() => {
    setStatus("");
    setPosition("");
    setAttendanceStatus("");
  }, [activeItem]);

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
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
              className="profile-img"
            />
          </div>
        </div>
      </div>

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
                // setValue={(val) => getColor(val, colorMap[activeItem], "black")}
              />
              <Dropdown
                options={POSITION_OPTIONS[activeItem]}
                value={position}
                onChange={(val: string) => handleDropdownChange(val, "position")}
                placeholder="Position"
                // setValue={(val) => getColor(val, colorMap[activeItem], "black")}

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
              // setValue={(val) => getColor(val, colorMap[activeItem], "black")}

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
              // setValue={(val) => getColor(val, colorMap[activeItem], "black")}

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
              // setValue={(val) => getColor(val, colorMap[activeItem], "black")}

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
