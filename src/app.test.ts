import request from "supertest";
import { app, resetTodos } from "./app";

test("GET /health responde ok", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("ok");
});

test("GET /hello saluda", async () => {
  const res = await request(app).get("/hello?name=Sebastian");
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Hola Sebastian");
});

test("GET /hello sin nombre", async () => {
  const res = await request(app).get("/hello");
  expect(res.body.message).toBe("Hola mundo");
});

describe("todos", () => {
  beforeEach(() => resetTodos());

  test("POST /todos crea una tarea", async () => {
    const res = await request(app).post("/todos").send({ title: "aprender jenkins" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, title: "aprender jenkins", done: false });
  });

  test("POST /todos valida el título", async () => {
    const res = await request(app).post("/todos").send({ title: "  " });
    expect(res.status).toBe(400);
  });

  test("GET /todos lista las tareas", async () => {
    await request(app).post("/todos").send({ title: "a" });
    const res = await request(app).get("/todos");
    expect(res.body).toHaveLength(1);
  });

  test("PATCH /todos/:id/done marca como hecha", async () => {
    await request(app).post("/todos").send({ title: "a" });
    const res = await request(app).patch("/todos/1/done");
    expect(res.body.done).toBe(true);
  });

  test("DELETE /todos/:id borra y da 404 si no existe", async () => {
    await request(app).post("/todos").send({ title: "a" });
    expect((await request(app).delete("/todos/1")).status).toBe(204);
    expect((await request(app).delete("/todos/1")).status).toBe(404);
  });
});