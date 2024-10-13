import React, { useState } from "react";

const ToDoCard = (props) => {
  const [strikethrough, setStrikethrough] = useState(props.completed);
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setStrikethrough(checked);
  };
  return (
    <div className="card-container">
      <div className="checkbox-container">
        <input
          className="checkbox"
          type="checkbox"
          checked={strikethrough}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="text-container">
        {strikethrough ? (
          <s className="description">{props.description}</s>
        ) : (
          <p className="description">{props.description}</p>
        )}
      </div>
      <div className="action-buttons-container">
        {!strikethrough && (
          <>
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
