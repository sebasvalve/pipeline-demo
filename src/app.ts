import express from "express";
export const app = express();
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/hello", (req, res) => {
  const name = req.query.name || "mundo";
  res.json({ message: `Hola ${name}` });
});