import { useEffect, useState } from "react";
import "./App.css";
import ToDoCard from "./ToDoCard";
import ToDoContext from "./todoContext";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loder, setLoder] = useState(true);
  const [addTodo, setAddTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const getTodoList = async () => {
    const data = await fetch(process.env.REACT_APP_GET_ROUTE);
    const todos = await data.json();
    setLoder(false);
    setTodoList(todos);
  };

  const handleAddTodo = async () => {
    if (newTodoText === "") return;
    setLoder(true);
    const data = await fetch(process.env.REACT_APP_POST_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newTodoText, completed: false }),
    });
    const response = await data.json();
    setLoder(false);
    setAddTodo(false);
    setNewTodoText("");
    setTodoList([...todoList, response]);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <ToDoContext.Provider value={{ todoList, setTodoList }}>
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
    </ToDoContext.Provider>
  );
}

export default App;
