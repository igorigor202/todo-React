import React from "react";

//
import "./style.css";

export default function Input({ type = "text", fill = false, ...props }) {
  // генератор имен классов, зависит от props
  function genClassNames() {
    let classes = ["input"];

    if (fill) {
      classes.push("input__fill");
    }

    return classes.join(" ");
  }

  return <input type={type} className={genClassNames()} {...props} />;
}
