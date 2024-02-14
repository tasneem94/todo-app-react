import { useState } from "react";

export const ToDoList = () => {
  const tasks = ["apple", "mango", "banana"];
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTodoList((prevTodoList) => [...prevTodoList, newTask]);
      setNewTask("");
    }
  };

  const delTask = (index) => {
    setTodoList(todoList.filter((_, i) => index !== i));
  };

  const checkedTask = (index) => {
    todoList.map((_, i) => {
      if (index === i) {
        const text = document.querySelectorAll(".text")[index];
        text.style.textDecoration = "line-through";
      }
    });
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTodoList = [...todoList];
      [updatedTodoList[index], updatedTodoList[index - 1]] = [
        updatedTodoList[index - 1],
        updatedTodoList[index],
      ];
      setTodoList(updatedTodoList);
    }
  };

  const moveTaskDown = (index) => {
    if (index < todoList.length - 1) {
      const updatedTodoList = [...todoList];
      [updatedTodoList[index], updatedTodoList[index + 1]] = [
        updatedTodoList[index + 1],
        updatedTodoList[index],
      ];
      setTodoList(updatedTodoList);
    }
  };

  return (
    <div className="to-do-list">
      <h1>My Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter as task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-task-btn" onClick={addTask}>
          ADD
        </button>
      </div>
      <div className="task-tile">
        <ul>
          {todoList.map((task, index) => {
            return (
              <li key={index}>
                <span className="text">{task}</span>
                <button className="del-btn" onClick={() => delTask(index)}>
                  DEL
                </button>
                <button className="up-btn" onClick={() => moveTaskUp(index)}>
                  UP
                </button>
                <button
                  className="down-btn"
                  onClick={() => moveTaskDown(index)}
                >
                  DOWN
                </button>
                <button
                  className="chekced-btn"
                  onClick={() => checkedTask(index)}
                >
                  CHECKED
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
