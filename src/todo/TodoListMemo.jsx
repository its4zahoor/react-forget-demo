import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColorPicker, RenderCounter } from "../components";
// import { Todo, AddTodo, Filter } from "./components";
import { Todo, AddTodo, Filter } from "./components/memo";
import { renders } from "../hooks/useRenderCounter";
import styles from "./TodoList.module.css";

export const TodoList = () => {
  const [color, setColor] = useState("#045975");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      text: "memo",
      isDone: false,
    },
    {
      id: uuidv4(),
      text: "useCallback",
      isDone: false,
    },
    {
      id: uuidv4(),
      text: "useMemo",
      isDone: false,
    },
  ]);

  const handleDone = useCallback((id) => {
    setTodos((todos) => {
      const idx = todos.findIndex((x) => x.id === id);
      const copyTodo = [...todos];
      copyTodo[idx].isDone = !todos[idx].isDone;
      return copyTodo;
    });
  }, []);

  const handleAdd = useCallback((text) => {
    if (!text) return;
    setTodos((todos) => [
      ...todos,
      {
        id: uuidv4(),
        text,
        isDone: false,
      },
    ]);
  }, []);

  const bgGradient = `linear-gradient(
    209.21deg,
    rgb(8, 126, 164) 13.57%,
    ${color} 98.38%
    )`;

  const filteredTodos = useMemo(() => {
    const filterState = {
      completed: true,
      active: false,
    };
    renders.count("filtered");

    return filter === "all"
      ? structuredClone(todos)
      : todos.filter((x) => x.isDone === filterState[filter]);
  }, [todos, filter]);

  return (
    <div className={styles.todoList}>
      <RenderCounter className={styles.counter} label="list" />
      <div className={styles.text}>
        Filter was called{" "}
        <span className={styles.count}>{renders.get("filtered")}</span>
        times
      </div>
      <div className={styles.listBlock} style={{ background: bgGradient }}>
        <div className={styles.top}>
          <ColorPicker color={color} onChange={setColor} />
          <Filter filter={filter} onFilter={setFilter} />
        </div>
        {filteredTodos.length ? (
          <ul className={styles.list}>
            {filteredTodos.map((todo) => (
              <Todo key={todo.id} todo={todo} onChange={handleDone} />
            ))}
          </ul>
        ) : (
          <div className={styles.noTodos}>No todos found :(</div>
        )}
        <AddTodo onSubmit={handleAdd} />
      </div>
    </div>
  );
};
