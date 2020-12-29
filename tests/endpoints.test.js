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
  it("Gets index", async (done) => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("API access for Gator Sublease");
    done();
  });
});
