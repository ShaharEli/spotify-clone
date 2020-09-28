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
  {id:1, title: shaharSong, albumId: 1, artistId: 1 },
  {id:2, title: amirSong, albumId: 2, artistId: 2 },
  {id:3,  title: dekelSong, albumId: 3, artistId: 3 },
];

describe("testing songs endpoints", () => {
  beforeAll(async () => {
    await Album.destroy({ truncate: true, force: true });
    await Artist.destroy({ truncate: true, force: true });
    await Artist.bulkCreate(artistsMock);
    await Album.bulkCreate(albumsMock);
    
  });
  beforeEach(async () => {
    await Song.destroy({ truncate: true, force: true });
  });
  it("get all albums", async (done) => {
    await Song.bulkCreate(songsMock);
    const { body } = await request(app).get("/songs");
    expect(body.length).toBe(3);
    expect(body[0].title).toBe(shaharSong);
    expect(body[0].Artist.name).toBe(shahar);
    expect(body[0].Album.name).toBe(shaharAlbum);
    expect(body[0].id).toBe(1);
    expect(body[1].title).toBe(amirSong);
    expect(body[1].Artist.name).toBe(amir);
    expect(body[1].Album.name).toBe(amirAlbum);
    expect(body[1].id).toBe(2);
    expect(body[2].title).toBe(dekelSong);
    expect(body[2].Artist.name).toBe(dekel);
    expect(body[2].Album.name).toBe(dekelAlbum);
    expect(body[2].id).toBe(3);
    done();
  });
  it("post new song", async (done) => {
    const { body } = await request(app).post("/songs").send(songsMock[2]);
    expect(body).toEqual({ success: "one song added" });
    const songs = await Song.findAll();
    const song = songs[0];
    expect(song.title).toBe(dekelSong);
    expect(song.id).toBe(3);
    done();
  });

  it("update song", async (done) => {
    const update = { title: hello };
    await Song.create(songsMock[0]);
    const { body: updateCheck } = await request(app)
      .put("/songs/1")
      .send(update);
    expect(updateCheck).toEqual({ 1: "updated" });
    const allSongs = await Song.findAll();
    expect(allSongs[0].toJSON().title).toEqual(hello);
    const { body } = await request(app).put("/songs/1").send(update);
    expect(body).toEqual({ 0: "updated" });
    done();
  });
  it("delete song", async (done) => {
    await Song.create(songsMock[0]);
    let songs = await Song.findAll();
    expect(songs.length).toBe(1);
    const { body: deleteCheck } = await request(app).delete("/songs/1");
    expect(deleteCheck).toEqual({ success: `song with id 1 deleted` });
    songs = await Song.findAll();
    expect(songs.length).toBe(0);
    done();
  });
});
