const { Router } = require("express");
const sequelize = require("sequelize");

const router = Router();
const { Song, Artist, Album, Interaction, User } = require("../ORM/models");



router.post("/view", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const checkInteraction = await Interaction.findOne({
      where: {
        userId: user.id,
        songId: req.body.songId,
      },
    });
    if (checkInteraction) {
      await Interaction.update(
        {
          playCount: checkInteraction.playCount + 1,
        },
        {
          where: {
            userId: user.id,
            songId: req.body.songId,
          },
        }
      );
    } else {
      await Interaction.create({
        playCount: 1,
        songId: req.body.songId,
        userId: user.id,
      });
    }
    res.send("viewd");
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Song.destroy({
      where: { id: req.params.id },
    });
    res.json({ success: `song with id ${req.params.id} deleted` });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const { body } = req;
  try {
    const updated = await Song.update(body, {
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
  try {
    await Song.create(req.body);
    res.json({ success: "one song added" });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allSongs = await Song.findAll({
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
    });
    res.json(allSongs);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/top", async (req, res) => {
  try {
    const allSongs = await Song.findAll({
      include: [
        {
          model: Artist,
          attributes: ["name"],
        },
        {
          model: Album,
          attributes: ["name","coverImg"],
        },
      ],
    });
    const interacrtions = await Interaction.findAll({
      attributes: [
        "songId",
        [sequelize.fn("sum", sequelize.col("play_count")), "views"],
      ],
      group: ["songId"],
    });
    const mostViewedSongs = [];
    for (let i = 0; i < interacrtions.length; i++) {
      for (let x = 0; x < allSongs.length; x++) {
        if (interacrtions[i].toJSON().songId === allSongs[x].toJSON().id) {
          mostViewedSongs.push({
            ...allSongs[x].toJSON(),
            views: interacrtions[i].toJSON().views,
          });
          break;
        }
      }
    }
    mostViewedSongs.sort((a, b) => b.views - a.views);
    res.json(mostViewedSongs.slice(0,20));
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const allSongs = await Song.findByPk(req.params.id, {
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
    });
    const views = await Interaction.findAll({
      where: {
        songId: req.params.id,
      },
      attributes: [[sequelize.fn("sum", sequelize.col("play_count")), "views"]],
    });
    const user = await User.findOne({
      where: {
        email: req.headers.email,
      },
    });
    let liked = await Interaction.findOne({
      where: {
        userId: user.id,
        songId: req.params.id,
      },
    });
    if (!liked) {
      liked = { isLiked: false };
    } else {
      liked = liked.toJSON();
    }
    const playCount = views[0].toJSON();
    const song = allSongs.toJSON();
    song.playCount = Number(playCount.views);
    song.isLiked = liked.isLiked;
    res.json(song);
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
