const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);
describe("Base Endpoints", () => {
  let server = null;

  beforeEach(() => {
    // server = app.listen(3000, () => console.log("Listening on port 3000"));
  });

  afterEach(async () => {
    // await server.close();
  });
  it("Tries to remove existing account", async (done) => {
    const response = await request.post("/api/account/remove_account").send({
      username: "duplicate",
    });
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: "Successfully removed user",
    });
    done();
  });
  it("Tries to remove existing account with unsufficient information", async (done) => {
    const response = await request.post("/api/account/remove_account").send({
      last_name: "duplicate",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "Insufficient information" });
    done();
  });
  it("Tries to add new account", async (done) => {
    const response = await request.post("/api/account/create_account").send({
      username: "duplicate",
      email: "duplicate",
      first_name: "duplicate",
      last_name: "duplicate",
      phone_number: "duplicate",
      password: "duplicate",
    });
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      success: "Account Created Successfully",
    });
    done();
  });
  it("Tries to add existing account", async (done) => {
    const response = await request.post("/api/account/create_account").send({
      username: "duplicate",
      email: "duplicate",
      first_name: "duplicate",
      last_name: "duplicate",
      phone_number: "duplicate",
      password: "duplicate",
    });
    expect(response.status).toBe(409);
    expect(response.body).toStrictEqual({
      error: "Email, Phone, or Username is already Taken",
    });
    done();
  });
  it("Tries to submit insufficient account creation information", async (done) => {
    const response = await request.post("/api/account/create_account").send({
      username: "duplicate",
      email: "duplicate",
      last_name: "duplicate",
      phone_number: "duplicate",
    });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "Insufficient information" });
    done();
  });
});
