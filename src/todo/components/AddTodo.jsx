import { useState } from "react";
import { RenderCounter } from "../../components";

import styles from "./AddTodo.module.css";

export const AddTodo = ({ onSubmit }) => {
  const [todo, setTodo] = useState("");
  return (
    <div className={styles.add}>
      <input
        className={styles.input}
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        placeholder="Type"
      />
      <button className={styles.button} onClick={() => onSubmit(todo)}>
        Add
      </button>
      <RenderCounter className={styles.counter} label="addTodo" />
    </div>
  );
};
