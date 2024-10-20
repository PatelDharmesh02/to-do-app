import React, { useContext, useState } from "react";
import ToDoContext from "./todoContext";

const ToDoCard = (props) => {
  const [strikethrough, setStrikethrough] = useState(props.completed);
  const [todoText, setTodoTask] = useState(props.description);
  const { todoList, setTodoList, setLoader } = useContext(ToDoContext);
  const [editState, setEditState] = useState(false);

  const handleCheckboxChange = async (e) => {
    const { checked } = e.target;
    setLoader(true);
    try {
      await fetch(`${process.env.REACT_APP_CHANGE_STATUS_ROUTE}/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: checked,
        }),
      });
    } catch (e) {
      console.error("Error:" + e.message);
    }
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === props.id) {
        return { ...todo, completed: checked };
      } else {
        return todo;
      }
    });
    setLoader(false);
    setTodoList(updatedTodos);
    setStrikethrough(checked);
  };

  const handleEdit = async () => {
    if (!editState) {
      setEditState(true);
      return;
    }
    try {
      setEditState(false);
      setLoader(true);
      await fetch(`${process.env.REACT_APP_EDIT_DESCR_ROUTE}/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: todoText,
        }),
      });
      debugger
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === props.id) {
          return { ...todo, description: todoText };
        } else {
          return todo;
        }
      });
      debugger
      setTodoList(updatedTodos);
    } catch (e) {
      console.error("Error:" + e.message);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${process.env.REACT_APP_DELETE_ROUTE}/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error("Error:" + e.message);
    }
    const updatedTodos = todoList.filter((todo) => {
      return todo.id !== props.id;
    });
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
          <s className="description">{todoText}</s>
        ) : !editState ? (
          <p className="description">{todoText}</p>
        ) : (
          <input
            className="todo-input"
            type="text"
            value={todoText}
            autoFocus={true}
            onChange={(e) => setTodoTask(e.target.value)}
          />
        )}
      </div>
      <div className="action-buttons-container">
        {!strikethrough && (
          <button className="edit-button" onClick={handleEdit}>
            {!editState ? "Edit" : "Save"}
          </button>
        )}
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDoCard;
