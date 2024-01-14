import React from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";
const Modal = ({ isOpen, onClose, id }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch({
    //   type: "addChat",
    //   payload: { username: "rohan", socket: "21", room: "21" },
    // });
    navigate("/chat");
  };
  if (!isOpen) return null;
  return (
    <div className="modal-background">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        <form className="docForm" onSubmit={handleSubmit}>
          <label>What is Your age</label>
          <input type="text" required={true} />
          <label>Where do you belongs to</label>
          <input type="text" required={true} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default Modal;
