const express = require("express");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");
const songs = require("./routes/songs");
const artists = require("./routes/artists");
const albums = require("./routes/albums");
const playlists = require("./routes/playlists");
const users = require("./routes/users");
const favorites = require("./routes/usersFavorites");

const app = express();
app.use(express.json());

app.use(cors());

// eslint-disable-next-line func-names
app.use(morgan(function (tokens, req, res) {
  const myTiny = [tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms'];
  return myTiny.join(' ');
}));

function ensureToken(req, res, next) {
  const {token} = req.headers;
  if (typeof token !== 'undefined') {
    jwt.verify(token, process.env.HASH, (error, data) => {
      // eslint-disable-next-line no-console
      console.log(data);
      if (error) {
        res.status(403).send('incurrect token');
      } else {
        if (!data.remember_token) {
          const newToken = { ...data };
          newToken.exp = Math.floor(Date.now() / 1000) + 3600;
          const updatedToken = jwt.sign(newToken, process.env.HASH);
          res.cookie('token', updatedToken);
        }
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}


app.use("/users", users);
// app.use(ensureToken);
app.use("/favorites", favorites);
app.use("/songs", songs);
app.use("/albums", albums);
app.use("/playlists", playlists);
app.use("/artists", artists);



module.exports = app;
