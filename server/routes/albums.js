const { Router } = require("express");
const sequelize = require("sequelize");
const { Album, Artist, Song, Interaction } = require("../ORM/models");

const router = Router();

router.get("/top", async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: [
        {
          model: Artist,
          attributes: ["name"],
        },
        { model: Song, attributes: ["id"] },
      ],
    });
    const interacrtions = await Interaction.findAll({
      attributes: [
        "songId",
        [sequelize.fn("sum", sequelize.col("play_count")), "views"],
      ],
      group: ["songId"],
    });
    const mostViewedAlbums = [];
    const albumsNames = [];
    for (let i = 0; i < interacrtions.length; i++) {
      for (let x = 0; x < albums.length; x++) {
        for (let y = 0; y < albums[x].toJSON().Songs.length; y++) {
          if (
            interacrtions[i].toJSON().songId === albums[x].toJSON().Songs[y].id
          ) {
            const checker = albumsNames.findIndex(
              (album) => album === albums[x].toJSON().name
            );
            if (checker < 0) {
              mostViewedAlbums.push({
                ...albums[x].toJSON(),
                views: Number(interacrtions[i].toJSON().views),
              });
              albumsNames.push(albums[x].toJSON().name);
              break;
            } else {
              mostViewedAlbums[checker].views += Number(
                interacrtions[i].toJSON().views
              );
              break;
            }
          }
        }
      }
    }
    mostViewedAlbums.sort((a, b) => b.views - a.views);
    res.json(mostViewedAlbums.slice(0, 20));
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Album.destroy({
      where: { id: req.params.id },
    });
    res.json({ success: `album with id ${req.params.id} deleted` });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {

  const { body } = req;
  try {
    const updated = await Album.update(body, {
      where: { id: req.params.id },
    });
      // eslint-disable-next-line no-unused-expressions
    updated[0] === 0 ? res.json({ 0: "updated" }) : res.json({ 1: "updated" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).send("content missing");
  }
  const { body } = req;
  try {
    await Album.create(body);
    res.json({ success: "one album added" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allAlbums = await Album.findAll({
      include: [
        {
          model: Artist,
          attributes: ["name"],
        },
        {
          model: Song,
          include: [
            {
              model: Artist,
              attributes: ["name"],
            },
            {
              model: Album,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    res.json(allAlbums);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Song,
          include: [
            {
              model: Artist,
              attributes: ["name"],
            },
            {
              model: Album,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Artist,
          attributes: ["name"],
        },
      ],
    });
    res.json(album);
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
