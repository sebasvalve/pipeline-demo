import express from "express";
export const app = express();

app.use(express.json());

type Todo = { id: number; title: string; done: boolean };
let todos: Todo[] = [];
let nextId = 1;

export const resetTodos = () => {
  todos = [];
  nextId = 1;
};

app.get("/todos", (_req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const title = req.body?.title;
  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "title es obligatorio" });
    return;
  }
  const todo: Todo = { id: nextId++, title: title.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/todos/:id/done", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) {
    res.status(404).json({ error: "no existe" });
    return;
  }
  todo.done = true;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    res.status(404).json({ error: "no existe" });
    return;
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/hello", (req, res) => {
  const name = req.query.name || "mundo";
  res.json({ message: `Hola ${name}` });
});