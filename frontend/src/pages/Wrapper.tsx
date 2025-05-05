import { useAppContext } from "../context/AppContext";
import DeleteConfirmationModal from "../UI/DeleteConfirmationModal";
import Loader from "../UI/Loader";
import Modal from "../UI/Modal";
import Sidebar from "../UI/Sidebar";
import MainContent from "./MainContent";

const Wrapper = () => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* HEADER & TABLE  */}
      <MainContent />

      {/* MODAL */}
      <Modal />
      <DeleteConfirmationModal />

      <Loader/>
    </div>
  );
};

export default Wrapper;
