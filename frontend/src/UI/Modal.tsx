import { useFormik } from "formik";
import { useEffect, useState } from "react";
import "../assets/css/header.css";
import "../assets/css/modal.css";
import { useAppContext } from "../context/AppContext";
import { addCandidate, getUser, updateUser } from "../core/_request";
import { MODAL_FIELDS } from "../core/const";
import { generateValidationSchema, responseHandler } from "../utils/_function";
import { showToast } from "../utils/toast";
import Button from "./Button";
import InputField from "./InputField";
import SearchField from "./SearchField";

const FormModal = () => {
  const { activeItem, modalState, setModalState, setListings, setLoader } =
    useAppContext();

  const fields = MODAL_FIELDS[activeItem] || [];
  const initialData = fields?.reduce((acc: any, field: any) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [userData, setUserData] = useState(initialData);

  useEffect(() => {
    const fetchUserData = async () => {
      if (modalState?.status === "edit") {
        setLoader(true);
        const { email } = modalState?.data;
        const res = await getUser(email);
        setLoader(false);

        if ([200, 201].includes(res?.status)) {
          setUserData({
            ...res?.users,
          });
        } else {

        }
      }
    };

    fetchUserData();
  }, [modalState?.status, fields]);

  // FORMIK
  const formik = useFormik({
    initialValues: userData || {},
    enableReinitialize: true,
    validationSchema: generateValidationSchema(activeItem),
    onSubmit: async (values) => {
      setLoader(true);
      if (activeItem === "Candidates" && modalState?.status === true) {
        const response = await addCandidate({
          ...values,
          department: "Designer",
        });
        responseHandler(
          response,
          setModalState,
          setListings,
          activeItem,
          setLoader
        );
      } else if (activeItem === "Leave" && modalState?.status === true) {
        const response = await updateUser({
          ...values,
        });
        responseHandler(
          response,
          setModalState,
          setListings,
          activeItem,
          setLoader
        );
      }
      else if (activeItem === "Employees" && modalState?.status === "edit") {
        const response = await updateUser({
          ...values,
        });
        responseHandler(
          response,
          setModalState,
          setListings,
          activeItem,
          setLoader
        );
      }
      else if (activeItem === "Attendance" && modalState?.status === "edit") {
        const response = await updateUser({
          ...values,
        });
        responseHandler(
          response,
          setModalState,
          setListings,
          activeItem,
          setLoader
        );
      }
      else if (modalState?.status === "edit") {
        const response = await updateUser({
          ...values,
          leave_data: values?.leaveDate,
        });
        responseHandler(
          response,
          setModalState,
          setListings,
          activeItem,
          setLoader
        );
      }
    },
  });


  const handleUserClick = (data: any) => {
    const userData = data?.find(
      (item: any) => item?.attendanceStatus === "present"
    );
    if (userData) {
      formik.setFieldValue("search", userData?.name);
      formik.setFieldValue("designation", userData?.department);
      // formik.setFieldValue("reason", userData?.reason);
      formik.setFieldValue("id", userData?.id);
    } else {
      showToast("error", "Selected user attendance is not Present", 5000);
    }
  };

  const shouldShowModal =
    modalState?.status === "edit" || modalState?.status === true;

  if (!shouldShowModal) return null;

  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <div className="modal-header">
          <h3>
            {activeItem === "Candidates" && modalState?.status === true
              ? "Add New Candidate"
              : activeItem === "Candidates" && modalState?.status === "edit"
                ? "Edit Candidate Details"
                : activeItem === "Employees"
                  ? "Edit Employee Details"
                  : activeItem === "Leave"
                    ? "Add New Leave"
                    : activeItem === "Attendance" ? "Edit Attendance" : ""}
          </h3>
          <button
            className="close-btn"
            onClick={() => {
              setModalState({ status: false, data: undefined });
              formik.resetForm();
            }}
          >
            ×
          </button>
        </div>

        <div className="modal-body input-grid">
          {fields.map((field: any) => {
            if (field?.type === "search") {
              return (
                <SearchField
                  values={formik.values?.search}
                  handleUserClick={handleUserClick}
                />
              );
            }
            const formattedValue = field.name === "date_of_joining" && formik.values[field.name]
              ? new Date(formik.values[field.name]).toISOString().split("T")[0]
              : formik.values[field.name];
            return (
              <InputField
                key={field.label}
                className=""
                label={field.label}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formattedValue}
                onChange={formik.handleChange}
                name={field.name}
                error={formik.touched[field.name] && formik.errors[field.name]}
              />
            );
          })}
        </div>

        <div className="modal-footer">
          <Button className="add-btn" onClick={() => formik.handleSubmit()}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
