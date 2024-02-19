import { useState } from "react";

export const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [activeBtn, setActiveBtn] = useState(null);

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
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) => ({ ...task, hidden: false }))
      );
    }
    setActiveBtn("all");
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
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) => ({ ...task, hidden: false }))
      );
      setActiveBtn("all");
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
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) => ({ ...task, hidden: false }))
      );
      setActiveBtn("all");
    }
  };

  const showAllTask = () => {
    setTodoList(todoList.map((task) => ({ ...task, hidden: false })));
    setActiveBtn("all");
  };

  const showCheckedTask = () => {
    setTodoList(
      todoList.map((task) =>
        task.checked ? { ...task, hidden: false } : { ...task, hidden: true }
      )
    );
    setActiveBtn("checked");
  };

  const showUncheckedTask = () => {
    setTodoList(
      todoList.map((task) =>
        task.checked ? { ...task, hidden: true } : { ...task, hidden: false }
      )
    );
    setActiveBtn("unchecked");
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
        <button className="add-task-btn" onClick={addTask}>
          ADD
        </button>
      </div>

      <div className="task-tile">
        <ul>
          {todoList.map((task, index) => {
            if (!task.hidden) {
              return (
                <li
                  key={index}
                  style={{
                    backgroundColor: task.checked
                      ? "hsl(67, 61%, 71%)"
                      : "hsl(67, 100%, 90%)",
                  }}
                >
                  <div
                    className="text"
                    style={{
                      textDecoration: task.checked ? "line-through" : "",
                      color: task.checked ? "hsl(124, 40%, 44%)" : "",
                    }}
                  >
                    {task.taskName}
                  </div>
                  <div className="btn-container">
                    <button className="btn" onClick={() => checkedTask(index)}>
                      ✅
                    </button>

                    <button className="btn" onClick={() => moveTaskUp(index)}>
                      👆
                    </button>
                    <button className="btn" onClick={() => moveTaskDown(index)}>
                      👇
                    </button>
                    <button className="btn" onClick={() => delTask(index)}>
                      ❌
                    </button>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
      {todoList.length > 0 && (
        <>
          <div className="show-btn-container">
            <button
              className={`btn ${activeBtn === "all" ? "active-btn" : ""}`}
              onClick={showAllTask}
            >
              SHOW ALL
            </button>
            <button
              className={`btn ${activeBtn === "checked" ? "active-btn" : ""}`}
              onClick={showCheckedTask}
            >
              SHOW CHECKED
            </button>
            <button
              className={`btn ${activeBtn === "unchecked" ? "active-btn" : ""}`}
              onClick={showUncheckedTask}
            >
              SHOW UNCHECKED
            </button>
          </div>
          <div className="clear-btn-container">
            <button className="btn" onClick={clearCheckedTask}>
              CLEAR CHECKED
            </button>
            <button className="btn" onClick={clearAllTask}>
              CLEAR ALL
            </button>
          </div>
        </>
      )}
    </div>
  );
};
