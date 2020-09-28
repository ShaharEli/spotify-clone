/* eslint-disable no-undef */
const request = require("supertest");
const { Album ,Song ,Artist } = require("../models");
const app = require("../../app");

const shahar = "shahar";
const amir = "amir";
const dekel = "dekel vaknin";
const shaharAlbum = "shahar EP";
const amirAlbum = "amir EP";
const dekelAlbum = "dekel vaknin EP";
const shaharSong = "shahar song";
const amirSong = "amir song";
const dekelSong = "dekel vaknin song";
const hello = "hello world";

const artistsMock = [
  { name: shahar,id:1 },
  { name: amir,id:2 },
  { name: dekel,id:3  },
];

const albumsMock = [
    { id:1,name: shaharAlbum,artistId:1  },
    { id:2,name: amirAlbum,artistId:2 },
    { id:3,name: dekelAlbum,artistId:3  },
];

const songsMock = [
    { title: shaharSong,albumId:1,artistId:1 },
    { title: amirSong,albumId:2,artistId:2 },
    { title: dekelSong,albumId:3,artistId:3 },
];




describe("testing albums endpoints", () => {
    beforeAll(async ()=>{
        await Song.destroy({ truncate: true, force: true });
         await Artist.destroy({ truncate: true, force: true });
        await Song.bulkCreate(songsMock)
        await Artist.bulkCreate(artistsMock)
    })
    beforeEach(async () => {
    await Album.destroy({ truncate: true, force: true });
  });
  it("get all albums", async (done) => {
    await Album.bulkCreate(albumsMock);
    const { body } = await request(app).get("/albums");
    expect(body.length).toBe(3);
    expect(body[0].name).toBe(shaharAlbum);
    expect(body[0].Artist.name).toBe(shahar);
    expect(body[0].Songs[0].title).toBe(shaharSong);
    expect(body[0].Songs[0].Artist.name).toBe(shahar);
    expect(body[0].Songs[0].Album.name).toBe(shaharAlbum);
    expect(body[0].id).toBe(1);
    expect(body[1].name).toBe(amirAlbum);
    expect(body[1].Artist.name).toBe(amir);
    expect(body[1].Songs[0].title).toBe(amirSong);
    expect(body[1].Songs[0].Artist.name).toBe(amir);
    expect(body[1].Songs[0].Album.name).toBe(amirAlbum);
    expect(body[1].id).toBe(2);
    expect(body[2].name).toBe(dekelAlbum);
    expect(body[2].Artist.name).toBe(dekel);
    expect(body[2].Songs[0].title).toBe(dekelSong);
    expect(body[2].Songs[0].Artist.name).toBe(dekel);
    expect(body[2].Songs[0].Album.name).toBe(dekelAlbum);
    expect(body[2].id).toBe(3);
    done();
  });
  xit("post new album", async (done) => {
    const { body } = await request(app).post("/artists").send(artistsMock[2]);
    expect(body).toEqual({ success: "one artist added" });
    const artists = await Artist.findAll();
    const artist = artists[0];
    expect(artist.name).toBe(dekel);
    expect(artist.id).toBe(1);
    done();
  });

  xit("update album", async (done) => {
    await Artist.create(artistsMock[0]);
    const { body: updateCheck } = await request(app)
      .put("/artists/1")
      .send({ name: hello });
    expect(updateCheck).toEqual({ 1: "updated" });
    const allArtists = await Artist.findAll();
    expect(allArtists[0].toJSON().name).toEqual(hello);
    const { body } = await request(app).put("/artists/1").send({ name: hello });
    expect(body).toEqual({ 0: "updated" });
    done();
  });
  xit("delete album", async (done) => {
    await Artist.create(artistsMock[0]);
    let artist = await Artist.findAll();
    expect(artist.length).toBe(1);
    const { body: deleteCheck } = await request(app).delete("/artists/1");
    expect(deleteCheck).toEqual({ success: `artist with id 1 deleted` });
    artist = await Artist.findAll();
    expect(artist.length).toBe(0);
    done();
  });
  xit("get album by id", async (done) => {
    await Artist.bulkCreate(artistsMock);
    const { body } = await request(app).get("/artists/2");
    expect([body].length).toBe(1);
    expect(body.name).toBe(amir);
    done();
  });
  xit("get top albums", async (done) => {
    const mockArtistsMultiplied = [];
    for (let i = 0; i < 10; i++) {
      mockArtistsMultiplied.push(...artistsMock);
    }
    expect(mockArtistsMultiplied.length).toBe(30);
    await Artist.bulkCreate(mockArtistsMultiplied);
    const { body: allArtists } = await request(app).get("/artists/top");
    expect(allArtists.length).toBe(20);
    expect(allArtists[0].name).toEqual(mockArtistsMultiplied[0].name);
    expect(allArtists[19].name).toEqual(mockArtistsMultiplied[19].name);
    done();
  });
});
