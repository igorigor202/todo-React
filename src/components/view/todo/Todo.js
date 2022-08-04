import React, { useEffect, useState } from "react";


import TodoList from "../list/TodoList";
import TodoAction from "../action/TodoAction";
import "./style.css";

export default function Todo() {
  const [initialPos, setInitialPos] = React.useState(null);
  const [initialSize, setInitialSize] = React.useState(null);
  const [listWidth, setListWidth] = useState(400);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [currentTodo, setCurTodo] = useState(null);

  // Изменить состояние задач в local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // добавлине todo
  function addTodo(todo) {
    setTodos((p) => [...p, todo]);
  }

  // Выбор текущей задачи
  function changeCurrentTodo(todo) {
    setCurTodo(todo);
  }

  // Удалить todo
  function deleteTodo(id) {
    setTodos((p) => p.filter((i) => i.id !== id));
    changeCurrentTodo(null);
  }

  // Изменить todo
  function editTodo(todo) {
    setTodos((p) => p.map((i) => (i.id === todo.id ? todo : i)));
    setCurTodo(todo);
  }

  // метод получения начальных значений элемент
  const initial = (e) => {
    let resizable = document.getElementById("Resizable");

    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);
  };

  // метод изменения ширины элементов todolist и todoaction
  const resize = (e) => {
    let resizable = document.getElementById("Resizable");
    let todoWrapper = document.getElementById("todoWrapper");

    let w = parseInt(initialSize) + parseInt(e.clientX - initialPos);

    if (w < 300 || w > 900) return;
    setListWidth(w);
    todoWrapper.style.gridTemplateColumns = `${w}px auto`;
    resizable.style.width = `${w}px`;
  };

  return (
    <div className="todo" id="todoWrapper">
      <TodoList
        initial={initial}
        resize={resize}
        addTodo={addTodo}
        todos={todos}
        listWidth={listWidth}
        changeCurrentTodo={changeCurrentTodo}
        currentTodo={currentTodo}
        deleteTodo={deleteTodo}
      />
      <TodoAction
        currentTodo={currentTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}
