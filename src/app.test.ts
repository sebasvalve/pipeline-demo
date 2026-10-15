import request from "supertest";
import { app } from "./app";

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