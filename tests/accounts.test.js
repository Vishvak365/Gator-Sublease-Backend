const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);
describe("Account Creation,Deletion,Validation", () => {
  let server = null;

  beforeEach(() => {
    // server = app.listen(3000, () => console.log("Listening on port 3000"));
  });

  afterEach(async () => {
    // await server.close();
  });
  let newUID;
  it("Tries to create new account", async (done) => {
    const structure = { emailVerified: false, disabled: false };
    const response = await request.post("/api/account/fb/create_account").send({
      email: "testEmail@test.com",
      password: "3kljd*ksld",
    });
    newUID = response.body.uid;
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(structure);
    done();
  });
  it("Tries to remove existing account", async (done) => {
    const response = await request.post("/api/account/fb/remove_account").send({
      uid: newUID,
    });
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      message: "Successfully removed user",
    });
    done();
  });
  it("Tries to create account with insufficient information", async (done) => {
    const response = await request.post("/api/account/fb/create_account").send({
      nonValid: "nonValid",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: "Email or Password not provided",
    });
    done();
  });
  it("Tries to remove existing account insufficient information", async (done) => {
    const response = await request.post("/api/account/fb/remove_account").send({
      nonValid: "nonValid",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ message: "UID not provided" });
    done();
  });
  it("Tries to create account with invalid information (email)", async (done) => {
    const response = await request.post("/api/account/fb/create_account").send({
      email: "nonValid",
      password: "test#@&(**Ud",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      code: "auth/invalid-email",
      message: "The email address is improperly formatted.",
    });
    done();
  });
  it("Tries to create account with invalid information (bad password)", async (done) => {
    const response = await request.post("/api/account/fb/create_account").send({
      email: "badPassword@badPassword.com",
      password: "short",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      code: "auth/invalid-password",
      message: "The password must be a string with at least 6 characters.",
    });
    done();
  });
  it("Tries to remove existing account invalid information", async (done) => {
    const response = await request.post("/api/account/fb/remove_account").send({
      uid: "nonValid",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      code: "auth/user-not-found",
      message:
        "There is no user record corresponding to the provided identifier.",
    });
    done();
  });
  it("Tries to validate with insufficent information", async (done) => {
    const response = await request.post("/api/account/fb/login").set({
      nonValid: "nonValid",
    });
    // expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "No token provided" });
    done();
  });
  it("Tries to validate with improper information (no bearer)", async (done) => {
    const response = await request.post("/api/account/fb/login").set({
      authorization: "nonValid",
    });
    // expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ message: "Invalid token" });
    done();
  });
  it("Tries to validate with invalid information", async (done) => {
    const response = await request.post("/api/account/fb/login").set({
      authorization: "Bearer nonValid",
    });
    expect(response.status).toBe(403);
    expect(response.body).toStrictEqual({
      code: "auth/argument-error",
      message:
        "Decoding Firebase ID token failed. Make sure you passed the entire string JWT which represents an ID token. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.",
    });
    done();
  });
});
