import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser } from "../core/_request";
import Button from "../UI/Button";
import Header2 from "../UI/Header2";
import InputField from "../UI/InputField";
import TextLink from "../UI/TextLink";
import { showToast } from "../utils/toast";
import AuthWrapper from "./AuthWrapper";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Full name should be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await registerUser(values);
      if (response?.status === 201) {
        showToast("success", response?.message);
        navigate("/login");
      } else {
        showToast("error", response?.message);
      }
    },
  });

  return (
    <AuthWrapper>
      {/* HEADER */}
      <Header2 className="login-header">Welcome to Dashboard</Header2>

      {/* INPUT FIELDS */}
      <InputField
        label="Full name"
        type="text"
        className="auth-input-field"
        id="Full name"
        placeholder="Full name"
        value={formik.values.fullName}
        name="fullName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.fullName && formik.errors.fullName
            ? formik.errors.fullName
            : undefined
        }
      />
      <InputField
        label="Email Address"
        type="text"
        className="auth-input-field"
        id="Email Address"
        placeholder="Email Address"
        value={formik.values.email}
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : undefined
        }
      />
      <InputField
        label="Password"
        type="password"
        className="auth-input-field"
        id="Password"
        placeholder="Password"
        value={formik.values.password}
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : undefined
        }
      />
      <InputField
        label="Confirm Password"
        type="password"
        className="auth-input-field"
        id="Confirm Password"
        placeholder="Confirm Password"
        value={formik.values.confirmPassword}
        name="confirmPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : undefined
        }
      />

      {/* SUBMIT BUTTON */}
      <Button
        type="button"
        style={{ margin: "15px 0px" }}
        onClick={() => formik.handleSubmit()}
      >
        Register
      </Button>

      <TextLink
        textBefore="Already have an account?"
        linkText={"Login"}
        to={"/login"}
      />
    </AuthWrapper>
  );
};

export default Signup;
