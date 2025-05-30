const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Users = require("../Model/usersModel");

// Testten önce ve sonra veritabanını temizle
beforeAll(async () => {
  await mongoose.connect(process.env.URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Users.deleteMany(); // Her testten sonra verileri sil
});

describe("User API tests", () => {
test("GET /api/users/getUsers - should return empty array",async()=>{
    const res = await request(app)
    .get("/api/users/getUsers");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
});

test("POST /api/users/createNewUser - should create a new User in database",async()=>{
    const newUser = {
        mail:"test@example.com",
        password:"123456",
        job:"developer"
    }

    const res = await request(app)
    .post("/api/users/createNewUser")
    .send(newUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.password).toBe("123456");
    expect(res.body.job).toBe("developer");
});
test("DELETE /api/users/deleteUser/:id - should delete the user of the id",async()=>{
     const createdUser = await Users.create({
        mail:"test1@example.com",
        password:"123456",
        job:"Nurse"
    });

    const res = await request(app)
    .delete(`/api/users/deleteUser/${createdUser._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(String(createdUser._id));


});


test("POST /api/users/createNewUser - should return 400 if email is missing", async () => {
  const res = await request(app)
    .post("/api/users/createNewUser")
    .send({
      password: "123456",
      job: "developer"
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeDefined();
});

test("UPDATE /api/users/updateUser/:id - should return 200 if content is replaced with the new one",async()=>{

  const createNewUser = await Users.create({
        mail:"testForUpdate@example.com",
        password:"123456",
        job:"Developer"
  });

  const res = await request(app).put(`/api/users/updateUser/${createNewUser._id}`).send({password:"112233"});

  expect(res.statusCode).toBe(200);
  expect(res.body.password).toEqual("112233");

});



});
