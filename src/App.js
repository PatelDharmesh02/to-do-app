import { useEffect, useState } from "react";
import "./App.css";
import ToDoCard from "./ToDoCard";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loder, setLoder] = useState(true);
  const [addTodo, setAddTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const getTodoList = async () => {
    const data = await fetch(
      "https://to-do-app-backend-tawny.vercel.app/get_todos"
    );
    const todos = await data.json();
    setLoder(false);
    setTodoList(todos);
  };

  const handleAddTodo = async () => {
    if (newTodoText === "") return;
    setLoder(true);
    const data = await fetch(
      "https://to-do-app-backend-tawny.vercel.app/add_todo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newTodoText, completed: false }),
      }
    );
    debugger;
    const response = await data.json();
    debugger;
    setLoder(false);
    setAddTodo(false);
    setNewTodoText("");
    setTodoList([...todoList, response]);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="App">
      {loder ? (
        <div>Loading...</div>
      ) : (
        <>
          {!addTodo && (
            <button className="add-button" onClick={() => setAddTodo(true)}>
              Add
            </button>
          )}
          {addTodo && (
            <div className="add-todo-container">
              <input
                className="todo-input"
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
              />
              <div className="action-buttons-container">
                <button
                  className="cancel-button"
                  onClick={() => setAddTodo(false)}
                >
                  Cancel
                </button>
                <button className="add-button" onClick={handleAddTodo}>
                  Add
                </button>
              </div>
            </div>
          )}
          {todoList.length > 0
            ? todoList.map((todo) => <ToDoCard key={todo.id} {...todo} />)
            : "You have completed all the Tasks🙌!!!"}
        </>
      )}
    </div>
  );
}

export default App;
