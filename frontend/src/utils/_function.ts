import moment from "moment";
import * as Yup from "yup";
import { getAllUsers } from "../core/_request";
import { MODAL_FIELDS } from "../core/const"; // Import MODAL_FIELDS
import { showToast } from "./toast";

// Generate a validation schema based on the active item
export const generateValidationSchema = (activeItem) => {
  const fields = MODAL_FIELDS[activeItem] || [];

  // Create a dynamic schema based on activeItem's fields
  const schema = fields.reduce((acc, field) => {
    if (field?.type === "email") {
      acc[field.name] = Yup.string()
        .email("Invalid email format")
        .required(`${field.label} is required`);
    } else if (field?.type === "date") {
      acc[field.name] = Yup.date().required(`${field.label} is required`);
    } else if (field?.type === "search" || field?.type === "file") {
      acc[field.name] = Yup.mixed().required(`${field.label} is required`);
    } else {
      acc[field.name] = Yup.string().required(`${field.label} is required`);
    }
    return acc;
  }, {});

  return Yup.object().shape(schema); // Return the constructed Yup schema
};

export const mapCandidatesData = (data: any[] = []) =>
  data.map((item: any, index: number) => {
    // console.log(item);
    return {
      no: index + 1,
      id: item._id,
      name: item.full_name,
      employee: item.full_name,
      email: item.email,
      phone: item.phone_number,
      position: item.position,
      status: item.status,
      leaveDate: item.leave_date,
      department: item.department,
      task: item.attendance_task,
      reason: item.leave_reason,
      leaveStatus: item.leave_status,
      attendanceStatus: item.attendance_status,
      docs: item.leave_doc,
      DOJ: moment(item?.date_of_joining)?.format("DD/MM/YY"),
      experience: `${item.experience}`,
    };
  });

export const responseHandler = async (
  response: any,
  setState: any,
  setListings: any,
  activeItem: string,
  setLoader: any
) => {
  if (response?.status === 201 || response?.status === 200) {
    showToast("success", response?.message);
    setState({ status: false, data: undefined });
    const usersResponse = await getAllUsers(activeItem);
    setLoader(false);
    if (usersResponse?.status === 201 || usersResponse?.status === 200) {
      const transformedData = mapCandidatesData(usersResponse?.users);
      setListings(transformedData);
    }
  } else {
    setLoader(false);
    console.log(response);
    showToast("error", response?.message);
  }
};

export function capitalize(s:string)
{
    return String(s[0]).toUpperCase() + String(s).slice(1);
}


export const applyFilters = (
  filters: { status: string; position: string; attendance: string ,leave:string },
  setListings: any,
  tempList: any
) => {
  setListings(
    tempList.filter((item: any) => {
      const matchesStatus = filters.status
        ? item.status?.toLowerCase() === filters.status.toLowerCase()
        : true;
      const matchesPosition = filters.position
        ? item.position?.toLowerCase() === filters.position.toLowerCase()
        : true;
        const matchesAttendance = filters.attendance
        ? item.attendanceStatus?.toLowerCase() === filters.attendance.toLowerCase()
        : true;
        const matchesleave = filters.leave
        ? item.leaveStatus?.toLowerCase() === filters.leave.toLowerCase()
        : true;
      return matchesStatus && matchesPosition && matchesAttendance && matchesleave;
    })
  );
};

