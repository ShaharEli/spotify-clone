/* eslint-disable no-undef */
const request = require("supertest");
const { Artist } = require("../models");
const app = require("../../app");

const artistsMock = [
  { name: "shahar" },
  { name: "amir" },
  { name: "dekel vaknin" },
];

describe("testing artists endpoints", () => {
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });
  it("get all artist", async (done) => {
    await Artist.bulkCreate(artistsMock);
    const { body } = await request(app).get("/artists");
    expect(body.length).toBe(3);
    expect(body[0].name).toBe("shahar");
    expect(body[1].name).toBe("amir");
    expect(body[2].name).toBe("dekel vaknin");
    done();
  });
  it("post new artist", async (done) => {
    const { body } = await request(app).post("/artists").send(artistsMock[2]);
    expect(body).toEqual({ success: "one artist added" });
    const artists = await Artist.findAll();
    const artist = artists[0];
    expect(artist.name).toBe(artistsMock[2].name);
    done();
  });

  it("update artist", async (done) => {
    await Artist.create(artistsMock[0]);
    const { body: updateCheck } = await request(app)
      .put("/artists/1")
      .send({ name: "hello world" });
    expect(updateCheck).toEqual({ 1: "updated" });
    const allArtists = await Artist.findAll();
    expect(allArtists[0].toJSON().name).toEqual("hello world");
    const { body } = await request(app)
      .put("/artists/1")
      .send({ name: "hello world" });
    expect(body).toEqual({ 0: "updated" });
    done();
  });
  it("delete artist", async (done) => {
    await Artist.create(artistsMock[0]);
    let artist = await Artist.findAll();
    expect(artist.length).toBe(1);
    const { body: deleteCheck } = await request(app).delete("/artists/1");
    expect(deleteCheck).toEqual({ success: `artist with id 1 deleted` });
    artist = await Artist.findAll();
    expect(artist.length).toBe(0);
    done();
  });
  it("get artist by id", async (done) => {
    await Artist.bulkCreate(artistsMock);
    const { body } = await request(app).get("/artists/2");
    expect([body].length).toBe(1);
    expect(body.name).toBe("amir");
    done();
  });
});
