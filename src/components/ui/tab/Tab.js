import React from "react";

import "./style.css";

export default function Tab({ value, change }) {
  return (
    <div className="tab">
      <section
        className={"tab__item " + (value === "ожидает" ? "active" : "")}
        onClick={() => change("ожидает")}
      >
        Ожидает
      </section>
      <section
        className={"tab__item " + (value === "в процессе" ? "active" : "")}
        onClick={() => change("в процессе")}
      >
        В процессе
      </section>
      <section
        className={"tab__item " + (value === "выполнена" ? "active" : "")}
        onClick={() => change("выполнена")}
      >
        Выполнена
      </section>
    </div>
  );
}
