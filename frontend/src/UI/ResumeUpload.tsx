import { FiUpload } from "react-icons/fi";
import "./ResumeUpload.css";

const ResumeUpload = ({ name, value, onChange, error }: any) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className="resume-upload-label">
        <span className="resume-text">{value?.name || "Resume"}</span>
        <FiUpload className="upload-icon" />
      </label>

      <input
        type="file"
        name={name}
        id={name}
        accept=".pdf,.doc,.docx"
        onChange={onChange}
        className="hidden-input"
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ResumeUpload;
