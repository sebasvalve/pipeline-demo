import request from "supertest";
import { app } from "./app";

test("GET /health responde ok", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("ok");
});