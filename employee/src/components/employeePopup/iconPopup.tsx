import React from "react";
import "./employeePopup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  icon: IconDefinition;
  color: string;
}

const IconPopup: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-header">
        {/* Close button (X icon) in the top right */}
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="popup-content">
        <FontAwesomeIcon icon={faCheckCircle} size="4x" color="green" />
      </div>
    </div>
  );
};

export default IconPopup;
