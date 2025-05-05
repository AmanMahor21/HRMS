import { useAppContext } from "../context/AppContext";
import "../index.css";

const Loader = () => {
  const { loader } = useAppContext();

  if (!loader) return null;
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>;
    </div>
  );
};

export default Loader;
