/* eslint-disable no-undef */
const request = require("supertest");
const { Album, Song, Artist } = require("../models");
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
  { name: shahar, id: 1 },
  { name: amir, id: 2 },
  { name: dekel, id: 3 },
];

const albumsMock = [
  { id: 1, name: shaharAlbum, artistId: 1 },
  { id: 2, name: amirAlbum, artistId: 2 },
  { id: 3, name: dekelAlbum, artistId: 3 },
];

const songsMock = [
  { title: shaharSong, albumId: 1, artistId: 1 },
  { title: amirSong, albumId: 2, artistId: 2 },
  { title: dekelSong, albumId: 3, artistId: 3 },
];

describe("testing albums endpoints", () => {
  beforeAll(async () => {
    await Song.destroy({ truncate: true, force: true });
    await Artist.destroy({ truncate: true, force: true });
    await Song.bulkCreate(songsMock);
    await Artist.bulkCreate(artistsMock);
  });
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
  it("post new album", async (done) => {
    const { body } = await request(app).post("/albums").send(albumsMock[2]);
    expect(body).toEqual({ success: "one album added" });
    const albums = await Album.findAll();
    const album = albums[0];
    expect(album.name).toBe(dekelAlbum);
    expect(album.id).toBe(3);
    done();
  });

  it("update album", async (done) => {
    const update = { name: hello };
    await Album.create(albumsMock[0]);
    const { body: updateCheck } = await request(app)
      .put("/albums/1")
      .send(update);
    expect(updateCheck).toEqual({ 1: "updated" });
    const allAlbums = await Album.findAll();
    expect(allAlbums[0].toJSON().name).toEqual(hello);
    const { body } = await request(app).put("/albums/1").send(update);
    expect(body).toEqual({ 0: "updated" });
    done();
  });
  it("delete album", async (done) => {
    await Album.create(albumsMock[0]);
    let albums = await Album.findAll();
    expect(albums.length).toBe(1);
    const { body: deleteCheck } = await request(app).delete("/albums/1");
    expect(deleteCheck).toEqual({ success: `album with id 1 deleted` });
    albums = await Album.findAll();
    expect(albums.length).toBe(0);
    done();
  });
  it("get album by id", async (done) => {
    await Album.bulkCreate(albumsMock);
    const { body } = await request(app).get("/albums/3");
    expect([body].length).toBe(1);
    expect(body.name).toBe(dekelAlbum);
    expect(body.Artist.name).toBe(dekel);
    expect(body.Songs[0].title).toBe(dekelSong);
    expect(body.Songs[0].Artist.name).toBe(dekel);
    expect(body.Songs[0].Album.name).toBe(dekelAlbum);
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
