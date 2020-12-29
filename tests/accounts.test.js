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
    done();
  });
});
