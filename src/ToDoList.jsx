import { useState } from "react";

export const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    const task = {
      taskName: newTask,
      checked: false,
      hidden: false,
    };
    if (newTask.trim() !== "") {
      setTodoList((prevTodoList) => [...prevTodoList, task]);
      setNewTask("");
    }
  };

  const delTask = (index) => {
    setTodoList(todoList.filter((_, i) => index !== i));
  };

  const checkedTask = (index) => {
    setTodoList(
      todoList.map((task, i) => {
        if (index === i) {
          return { ...task, checked: true };
        } else {
          return task;
        }
      })
    );
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

  const showAllTask = () => {
    setTodoList(todoList.map((task) => ({ ...task, hidden: false })));
  };

  const showCheckedTask = () => {
    setTodoList(
      todoList.map((task) =>
        task.checked ? { ...task, hidden: false } : { ...task, hidden: true }
      )
    );
  };

  const showUncheckedTask = () => {
    setTodoList(
      todoList.map((task) =>
        task.checked ? { ...task, hidden: true } : { ...task, hidden: false }
      )
    );
  };

  const clearCheckedTask = () => {
    setTodoList(todoList.filter((task) => !task.checked));
  };

  const clearAllTask = () => {
    setTodoList([]);
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
        <button className="add-task-btn btn" onClick={addTask}>
          ADD
        </button>
        <button className="btn" onClick={showAllTask}>
          SHOW ALL
        </button>
        <button className="btn" onClick={showCheckedTask}>
          SHOW CHECKED
        </button>
        <button className="btn" onClick={showUncheckedTask}>
          SHOW UNCHECKED
        </button>
        <button className="btn" onClick={clearCheckedTask}>
          CLEAR CHECKED
        </button>
        <button className="btn" onClick={clearAllTask}>
          CLEAR ALL
        </button>
      </div>
      <div className="task-tile">
        <ul>
          {todoList.map((task, index) => {
            if (!task.hidden) {
              return (
                <li key={index}>
                  <span
                    className="text"
                    style={{
                      textDecoration: task.checked ? "line-through" : "",
                    }}
                  >
                    {task.taskName}
                  </span>
                  <button
                    className="del-btn btn"
                    onClick={() => delTask(index)}
                  >
                    DEL
                  </button>
                  <button
                    className="up-btn btn"
                    onClick={() => moveTaskUp(index)}
                  >
                    UP
                  </button>
                  <button
                    className="down-btn btn"
                    onClick={() => moveTaskDown(index)}
                  >
                    DOWN
                  </button>
                  <button
                    className="chekced-btn btn"
                    onClick={() => checkedTask(index)}
                  >
                    CHECKED
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
