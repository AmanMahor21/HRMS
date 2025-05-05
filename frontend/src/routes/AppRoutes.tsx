import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { useAppContext } from "../context/AppContext";
import Wrapper from "../pages/Wrapper";

const AppRoutes = () => {
  const { isLoggedIn } = useAppContext();

  const getElement = (forAuth: boolean, Component: React.ComponentType) => {
    return forAuth === isLoggedIn ? (
      <Component />
    ) : (
      <Navigate to={forAuth ? "/login" : "/dashboard"} replace />
    );
  };

  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/dashboard" element={getElement(true, Wrapper)} />
        <Route path="/login" element={getElement(false, Login)} />
        <Route path="/signup" element={getElement(false, Signup)} />
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
