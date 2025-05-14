import React, { useEffect, useState } from "react";
import { Dropdown } from "../../UI/Dropdown";
import "../../assets/css/table.css";
import { useAppContext } from "../../context/AppContext";
import { getAllUsers, updateUser } from "../../core/_request";
import { STATUS_OPTIONS, tableConfigs } from "../../core/const";
import {
  capitalize,
  getColor,
  mapCandidatesData,
  responseHandler,
  unmapCandidatesData,
} from "../../utils/_function";
import Tooltip from "./Tooltip";
import { LeaveCalendar } from "../../UI/LeaveCalender";
import  {colorMap}  from "../../core/dropdownConst";

const Table = () => {
  const { activeItem, setModalState, listing, setListings, setLoader } =
    useAppContext();

  const [activeTooltipId, setActiveTooltipId] = useState<number | null>(null);
  const [approvedLeave, setApprovedLeave] = useState([]);
  const tableConfig = tableConfigs[activeItem] || { columns: [], data: [] };
  const [leaveData, setLeaveData] = useState<{ [key: string]: number }>({});


  // Fill leave aprove list
  useEffect(() => {
    const approved = listing.filter((ele: any) => ele.leaveStatus === 'approve');

    const grouped: { [key: string]: number } = {};
    for (const item of approved) {
      if (item.leaveDate) {
        grouped[item.leaveDate] = (grouped[item.leaveDate] || 0) + 1;
      }
    }

    setApprovedLeave(approved);
    setLeaveData(grouped);
  }, [listing]);


  // HANDLE MODAL
  const handleTooltipToggle = (id: number) => {
    setActiveTooltipId((prevId) => (prevId === id ? null : id));
  };

  // HANDLE TABLE ACTIONS
  const handleClick = (type: string, data: any) => {
    setActiveTooltipId(null);
    setModalState({ status: type, data: data });
  };

  // GET ALL USERS
  useEffect(() => {
    setLoader(true);
    getAllUsers(activeItem).then((res: any) => {
      setLoader(false);
      if (res?.status === 201 || res?.status === 200) {
        const transformedData = mapCandidatesData(res?.users);
        setListings(transformedData);
      }
    });
  }, [activeItem]);

  const handleStatusChange = async (id: string, value: string) => {
    const record = listing?.find((item: any) => item?.id === id);
    const unmap = unmapCandidatesData([record])[0];
    const response = await updateUser({
      ...unmap,
      ...(activeItem === "Candidates"
        ? { status: value?.toLocaleLowerCase() }
        : activeItem === "Attendance"
          ? { attendance_status: value?.toLocaleLowerCase() }
          : { leave_status: value?.toLocaleLowerCase() }),
    });
    responseHandler(
      response,
      setModalState,
      setListings,
      activeItem,
      setLoader
    );
  };
  console.log(listing,'ppppppp');

  return (
    <div className="leave_wrapper">
      <div className="table-container">
        <div className="table-scroll-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                {tableConfig?.columns.map((col) => (
                  <th key={col.accessor}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listing?.map((row: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {tableConfig?.columns.map((col: any) => {
                    const value = row[col.accessor];

                    // Determine if this cell should show a status dropdown
                    const isStatusColumn =
                      (activeItem === "Candidates" && col.accessor === "status") ||
                      (activeItem === "Attendance" && col.accessor === "attendanceStatus") ||
                      (activeItem === "Leave" && col.accessor === "leaveStatus");

                    return (
                      <td key={col.accessor}>
                        {col.render ? (
                          // Check if it's a custom component like ThreeDotsIcon
                          col.accessor === "id" ? (
                            <>
                              {React.createElement(col.render, {
                                width: 15,
                                height: 15,
                                id: `dots-${row.id}`,
                                className: "three-dots",
                                onClick: () => handleTooltipToggle(row.id),
                              })}
                              {activeTooltipId === row.id && (
                                <Tooltip
                                  id={row.id}
                                  onEdit={() => handleClick("edit", row)}
                                  onDelete={() => handleClick("delete", row)}
                                />
                              )}
                            </>
                          ) : (
                            // Render function for fields like profile image
                            col.render(row)
                          )
                        ) : isStatusColumn ? (
                          <Dropdown
                            options={STATUS_OPTIONS[activeItem]}
                            value={capitalize(value)}
                            onChange={(val) => handleStatusChange(row.id, val)}
                            placeholder="Status"
                            setValue={(val) =>
                              getColor(val, colorMap[activeItem], "black")
                            }
                          />
                        ) : (
                          // Default rendering
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show calendar and leave list only if activeItem is "Leave" */}
      {activeItem === "Leave" && (
        <div className="calender_wrapper">
          <LeaveCalendar leaveData={leaveData} />
          <h2>Approved Leaves</h2>

          {approvedLeave.map((ele, index) => (
            <div key={index} className="leave-entry">
              <div className="leave-info">
                <div className="avatar">
                  {/* <img src={ele.avatar} alt={ele.name} /> */}
                </div>
                <div className="text">
                  <div className="name-date">
                    <span className="name">{ele.name}</span>
                    <span className="date">{ele.leaveDate}</span>
                  </div>
                  <div className="designation">{ele.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default Table;
