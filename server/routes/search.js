const { Router } = require("express");
const sequelize = require("sequelize");

const router = Router();
const {
  Song,
  Artist,
  Album,
  Playlist,
  Playlists_song,
  Interaction,
} = require("../ORM/models");

const { Client } = require("@elastic/elasticsearch");
export const client = new Client({
  cloud: {
    id: process.env.SEARCH_ID,
  },
  auth: {
    username: process.env.SEARCH_USER,
    password: process.env.SEARCH_PASS,
  },
});

router.get("/songs", async (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = 1000;
  }
  client.search(
    {
      index: "song",
      body: {
        size,
        query: {
          wildcard: {
            title: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result.body.hits.hits.map((item) => item._source));
    }
  );
});

router.get("/albums", async (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = 1000;
  }
  client.search(
    {
      index: "album",
      body: {
        size,
        query: {
          wildcard: {
            name: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result.body.hits.hits.map((item) => item._source));
    }
  );
});
router.get("/artists", async (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = 1000;
  }
  client.search(
    {
      index: "artist",
      body: {
        size,
        query: {
          wildcard: {
            name: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result.body.hits.hits.map((item) => item._source));
    }
  );
});
router.get("/playlists", async (req, res) => {
  const { all, search } = req.query;
  let size = 3;
  if (all === "all") {
    size = 1000;
  }
  client.search(
    {
      index: "playlist",
      body: {
        size,
        query: {
          wildcard: {
            name: {
              value: `*${search}*`,
            },
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) res.json(result.body.hits.hits.map((item) => item._source));
    }
  );
});
module.exports = router;
