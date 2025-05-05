import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <div>
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MasterLayout;
