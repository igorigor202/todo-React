import React, { useEffect, useState } from "react";

//
import Input from "../../ui/input/Input";
import Tab from "../../ui/tab/Tab";
import "./style.css";

export default function TodoAction({ currentTodo, deleteTodo, editTodo }) {
  const [todo, setTodo] = useState({ title: "", state: "" });

  useEffect(() => {
    setTodo({ ...currentTodo });
  }, [currentTodo]);

  // Редактировать название
  function editTitle(e) {
    e.preventDefault();

    if (!todo.title) {
      alert("Пожалуйста, введите название задачи !!!");
      return;
    }

    editTodo(todo);
  }

  // Изменить состояние
  function changeState(state) {
    editTodo({ ...todo, state });
  }

  return (
    <div className="todo__action">
      {currentTodo ? (
        <main>
          <h1>Редактирование</h1>
          <form className="edit__wrapper" onSubmit={editTitle}>
            <Input
              type="text"
              fill={1}
              value={todo.title}
              onChange={(e) =>
                setTodo((p) => ({ ...p, title: e.target.value }))
              }
            />
            <i className="icon icon-edit" onClick={editTitle}></i>
          </form>
          <Tab value={todo.state} change={changeState} />
          <i
            className="icon icon-delete"
            onClick={() => deleteTodo(todo.id)}
          ></i>
        </main>
      ) : (
        <h1>Выберите задачу</h1>
      )}
    </div>
  );
}
