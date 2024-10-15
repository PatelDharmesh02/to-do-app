import React, { useContext, useState } from "react";
import ToDoContext from "./todoContext";

const ToDoCard = (props) => {
  const [strikethrough, setStrikethrough] = useState(props.completed);
  const { setTodoList } = useContext(ToDoContext);
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setStrikethrough(checked);
  };
  const handleDelete = async () => {
    await fetch(`${process.env.REACT_APP_DELETE_ROUTE}/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await fetch(process.env.REACT_APP_GET_ROUTE);
    const updatedTodos = await data.json();
    setTodoList(updatedTodos);
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
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
