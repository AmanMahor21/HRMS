import { useFormik } from "formik"; // Import useFormik from Formik
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Import Yup for validation
import { useAppContext } from "../context/AppContext";
import { loginUser } from "../core/_request";
import Button from "../UI/Button";
import Header2 from "../UI/Header2";
import InputField from "../UI/InputField";
import TextLink from "../UI/TextLink";
import { showToast } from "../utils/toast";
import AuthWrapper from "./AuthWrapper";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password should be at least 4 characters"),
});

const Login = () => {
  const { setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log(response);
      const response = await loginUser(values);
      if (response?.status === 201 || response?.status === 200) {
        showToast("success", response?.message);
        setIsLoggedIn(true);
        localStorage.setItem("token", response?.token);
        localStorage.setItem("user", JSON.stringify(response?.user));
        navigate("/");
      } else {
        showToast("error", response?.message);
      }
    },
  });

  return (
    <>
      <AuthWrapper>
        {/* HEADER */}
        <Header2 className="login-header">Welcome to dashboard</Header2>

        {/* INPUT FIELDS */}
        <InputField
          label="Email Address"
          type="text"
          className="auth-input-field"
          id="email"
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
          id="password"
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

        <TextLink linkText={"Forget password?"} to={"/"} />

        {/* SUBMIT BUTTON */}
        <Button
          type="button"
          style={{ margin: "15px 0px" }}
          onClick={() => formik.handleSubmit()}
        >
          Submit
        </Button>

        <TextLink
          textBefore="Don't have an account?"
          linkText={"Register?"}
          to={"/signup"}
        />
      </AuthWrapper>
    </>
  );
};

export default Login;
