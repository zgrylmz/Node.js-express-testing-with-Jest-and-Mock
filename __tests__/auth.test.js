const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Users = require("../Model/usersModel");


test("GET /api/users/secret - should fail without token", async () => {
  const res = await request(app).get("/api/users/secret");
  expect(res.statusCode).toBe(401);
});

test("GET /api/users/secret - should succeed with valid token", async () => {

  const loginRes = await request(app).post("/api/users/login").send({
    email: "admin@test.com",
    password: "123456",
  });

  const token = loginRes.body.token;

  const res = await request(app)
    .get("/api/users/secret")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Access granted");
});
