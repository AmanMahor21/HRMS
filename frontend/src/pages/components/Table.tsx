import React, { useEffect, useState } from "react";
import { Dropdown } from "../../UI/Dropdown";
import "../../assets/css/table.css";
import { useAppContext } from "../../context/AppContext";
import { getAllUsers, updateUser } from "../../core/_request";
import { STATUS_OPTIONS, tableConfigs } from "../../core/const";
import {
  capitalize,
  mapCandidatesData,
  responseHandler,
} from "../../utils/_function";
import Tooltip from "./Tooltip";

const Table = () => {
  const { activeItem, setModalState, listing, setListings, setLoader } =
    useAppContext();

  const [activeTooltipId, setActiveTooltipId] = useState<number | null>(null);
  const tableConfig = tableConfigs[activeItem] || { columns: [], data: [] };

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
    const response = await updateUser({
      ...record,
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

  return (
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
                {tableConfig?.columns.map((col: any) => (
                  <td key={col.accessor}>
                    {col.render ? (
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
                    ) : (activeItem === "Candidates" &&
                        col.accessor === "status") ||
                      (activeItem === "Attendance" &&
                        col.accessor === "attendanceStatus") ||
                      (activeItem === "Leave" &&
                        col.accessor === "leaveStatus") ? (
                      <Dropdown
                        options={STATUS_OPTIONS[activeItem]}
                        value={capitalize(
                          activeItem === "Candidates"
                            ? row?.status
                            : activeItem === "Attendance"
                            ? row?.attendanceStatus
                            : activeItem === "Leave"
                            ? row?.leaveStatus
                            : ""
                        )}
                        onChange={(value) => handleStatusChange(row.id, value)}
                        placeholder="Status"
                      />
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Table;
