import React, { useEffect, useState } from "react";
import Input from "../../ui/input/Input";
import "./style.css";

let bg_indicator = {
  "ожидает": "#777",
  "в процессе": "#00308F",
  "выполнена": "#5BB318",
};

export default function TodoList({
  initial,
  resize,
  addTodo,
  todos,
  listWidth,
  changeCurrentTodo,
  currentTodo,
  deleteTodo,
}) {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  // Поиск по имени todo
  useEffect(() => {
    if (!search.length) {
      setList(todos);
      return;
    }

    setList(
      todos.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [todos, search]);

  // cоздат объект todo и добавьте его в список
  function onAddTodo(e) {
    e.preventDefault();

    if (!title) {
      alert("Пожалуйста, введите название задачи !!!");
      return;
    }

    let todo = {
      id: Date.now(),
      title,
      state: "ожидает",
    };

    addTodo(todo);
    setTitle("");
  }

  // Удаление todo
  function onDelete(e, id) {
    e.stopPropagation();
    deleteTodo(id);
  }

  return (
    <div className="todo__list">
      <div id="Resizable">
        <nav>
          <section className="search__wrapper">
            <Input
              fill={1}
              placeholder="Поиск по имени..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="icon icon-search"></i>
          </section>
          <form className="add__wrapper" onSubmit={onAddTodo}>
            <Input
              fill={1}
              placeholder="Название задачи"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <i className="icon icon-add" onClick={onAddTodo}></i>
          </form>
        </nav>
        <main>
          <ul>
            {list.map((i) => (
              <li
                key={i.id}
                onClick={() => changeCurrentTodo(i)}
                className={i.id === currentTodo?.id ? "active" : ""}
              >
                <div
                  className="indicator"
                  style={{ background: bg_indicator[i.state] }}
                />
                <p style={{ width: listWidth - 180 + "px" }}>{i.title}</p>
                <i
                  className="icon icon-delete"
                  onClick={(e) => onDelete(e, i.id)}
                ></i>
              </li>
            ))}
          </ul>
        </main>
      </div>
      <div
        id="Draggable"
        draggable="true"
        onDragStart={initial}
        onDrag={resize}
      />
    </div>
  );
}
