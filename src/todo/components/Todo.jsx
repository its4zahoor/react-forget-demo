import React from "react";
import { RenderCounter } from "../../components";
import styles from "./Todo.module.css";

export const Todo = ({ todo, onChange }) => {
  console.log("TODO");
  return (
    <li className={styles.item}>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="checkbox"
          checked={todo.isDone}
          onChange={() => onChange(todo.id)}
        />
        <span className={styles.checkmark} />
        <span className={styles.text}>{todo.text}</span>
      </label>
      <RenderCounter className={styles.counter} label={todo.id} />
    </li>
  );
};

export const TodoMemo = React.memo(Todo);
