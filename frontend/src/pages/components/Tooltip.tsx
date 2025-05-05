import React from "react";
import "../../assets/css/tooltip.css";

interface TooltipProps {
  id: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ id, onEdit, onDelete }) => {
  return (
    <div className="tooltip-container" id={`tooltip-${id}`}>
      <div className="tooltip-option" onClick={onEdit}>
        Edit
      </div>
      <div className="tooltip-option" onClick={onDelete}>
        Delete
      </div>
    </div>
  );
};

export default Tooltip;
