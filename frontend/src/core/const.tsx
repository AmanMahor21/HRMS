import { BsFileBarGraph, BsStars } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import ThreeDotsIcon from "../assets/svg/ThreeDotsIcon";

// SIDE BAR
export const SIDEBAR_MENUS = [
  {
    title: "Recruitment",
    items: [{ label: "Candidates", icon: HiOutlineUserPlus }],
  },
  {
    title: "Organization",
    items: [
      { label: "Employees", icon: FiUsers },
      { label: "Attendance", icon: BsFileBarGraph },
      { label: "Leave", icon: BsStars },
    ],
  },
  {
    title: "Others",
    items: [{ label: "Logout", icon: MdLogout, isLogout: true }],
  },
];

// TABLE
export const tableConfigs: Record<
  string,
  {
    columns: {
      header: string;
      accessor: string;
      render?: any;
    }[];
    data: any[];
  }
> = {
  Candidates: {
    columns: [
      { header: "Sr No", accessor: "no" },
      { header: "Candidate Name", accessor: "name" },
      { header: "Email Address", accessor: "email" },
      { header: "Phone Number", accessor: "phone" },
      { header: "Position", accessor: "position" },
      { header: "Status", accessor: "status" },
      { header: "Experience", accessor: "experience" },
      {
        header: "Actions",
        accessor: "id",
        render: ThreeDotsIcon,
      },
    ],
    data: [
      {
        no: 1,
        id: 1,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 555-1234",
        position: "Frontend Developer",
        status: "Inactive",
        experience: "2 years",
      },
    ],
  },

  Employees: {
    columns: [
      {
        header: "Profile",
        accessor: "profile",
        render: ({ profile }: { profile: string }) => (
          <img
            src={profile || "https://as1.ftcdn.net/v2/jpg/12/47/50/02/1000_F_1247500272_kJB5cpMOHgbzfXeqg2spytDlTMI6J7zT.jpg"}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ),
      },
      { header: "Employee Name", accessor: "name" },
      { header: "Email Address", accessor: "email" },
      { header: "Phone Number", accessor: "phone" },
      { header: "Position", accessor: "position" },
      { header: "Department", accessor: "department" },
      { header: "Date of Joining", accessor: "DOJ" },
      {
        header: "Actions",
        accessor: "id",
        render: ThreeDotsIcon,
      },
    ],
    data: [
      {
        id: 1,
        profile: "img_url",
        name: "Mike Ross",
        email: "mike@example.com",
        phone: "+1 555-1234",
        position: "Engineer",
        department: "Engineering",
        DOJ: "2020-04-01",
      },
      {
        id: 2,
        profile: "img_url",
        name: "Rachel Zane",
        email: "rachel@example.com",
        phone: "+1 555-5678",
        position: "Lawyer",
        department: "Legal",
        DOJ: "2019-06-15",
      },
    ],
  },

  Attendance: {
    columns: [
      {
        header: "Profile",
        accessor: "profile",
        render: ({ profile }: { profile: string }) => (
          <img
            src={profile || "https://as1.ftcdn.net/v2/jpg/12/47/50/02/1000_F_1247500272_kJB5cpMOHgbzfXeqg2spytDlTMI6J7zT.jpg"}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ),
      },      { header: "Employee", accessor: "employee" },
      { header: "Position", accessor: "position" },
      { header: "Department", accessor: "department" },
      { header: "Task", accessor: "task" },
      { header: "Status", accessor: "attendanceStatus" },
      {
        header: "Actions",
        accessor: "id",
        render: ThreeDotsIcon,
      },
    ],
    data: [
      {
        id: 1,
        profile: "img_url",
        employee: "Mike Ross",
        position: "Engineer",
        department: "Engineering",
        task: "Development",
        status: "Present",
      },
      {
        id: 2,
        profile: "img_url",
        employee: "Rachel Zane",
        position: "Lawyer",
        department: "Legal",
        task: "Meeting",
        status: "Absent",
      },
    ],
  },

  Leave: {
    columns: [
      {
        header: "Profile",
        accessor: "profile",
        render: ({ profile }: { profile: string }) => (
          <img
            src={profile || "https://as1.ftcdn.net/v2/jpg/12/47/50/02/1000_F_1247500272_kJB5cpMOHgbzfXeqg2spytDlTMI6J7zT.jpg"}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ),
      },      { header: "Name", accessor: "name" },
      { header: "Date", accessor: "leaveDate" },
      { header: "Reason", accessor: "reason" },
      { header: "Status", accessor: "leaveStatus" },
      { header: "Docs", accessor: "docs" },
    ],
    data: [
      {
        id: 1,
        profile: "img_url",
        name: "Mike Ross",
        date: "2025-04-20 to 2025-04-22",
        reason: "Sick Leave",
        status: "Present",
        docs: "Medical Certificate",
      },
      {
        id: 2,
        profile: "img_url",
        name: "Rachel Zane",
        date: "2025-05-05 to 2025-05-10",
        reason: "Annual Leave",
        status: "Present",
        docs: "Vacation Approval",
      },
    ],
  },
};

// MODAL FIELDS
export const MODAL_FIELDS = {
  Candidates: [
    { label: "Full Name", placeholder: "Full name", name: "full_name" },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      name: "email",
    },
    { label: "Phone Number", placeholder: "Phone Number", name: "phone_number" },
    { label: "Position", placeholder: "Position", name: "position" },
    { label: "Experience", placeholder: "Experience", name: "experience" },
    { label: "Resume", placeholder: "resume", name: "resume" },
  ],
  Employees: [
    {
      label: "Employee Name",
      placeholder: "Employee name",
      name: "full_name",
      // name: "employeeName",
    },
    {
      label: "Email Address",
      type: "email",
      placeholder: "Email address",
      name: "email",
      // name: "emailAddress",
    },
    { label: "Phone Number", placeholder: "Phone number", name: "phone_number" },
    // { label: "Phone Number", placeholder: "Phone number", name: "phoneNumber" },
    { label: "Position", placeholder: "Position", name: "position" },
    { label: "Department", placeholder: "Department", name: "department" },
    {
      label: "Date of Joining",
      type: "date",
      placeholder: "Select joining date",
      name: "date_of_joining",
      // name: "dateOfJoining",
    },
  ],
  Leave: [
    { label: "Search", type: "search", placeholder: "search", name: "search" },
    { label: "Designation", placeholder: "Designation", name: "designation" },
    {
      label: "Leave Date",
      type: "date",
      placeholder: "Leave Date",
      name: "leave_date",
    },
    {
      label: "Document",
      type: "file",
      placeholder: "Document",
      name: "leave_doc",
    },
    { label: "Reason", placeholder: "Reason", name: "leave_reason" },
  ],
  Attendance: [
    { label: "Task", placeholder: "Task", name: "attendance_task" },

  ],
};

export const STATUS_OPTIONS = {
  Candidates: ["New", "Scheduled", "Ongoing", "Selected", "Rejected"],
  Employees: ["Intern", "Full Time", "Junior", "Senior", "Team Lead"],
  Attendance: ["Pending", "Present", "Absent"],
  Leave: ["Pending", "Approve", "Reject"],
};

export const POSITION_OPTIONS = {
  Candidates: ["Intern", "Full Time", "Junior", "Senior", "Team Lead"],
};
