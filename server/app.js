const express = require("express")
const app=express()
app.use(express.json())
const mysql = require('mysql2');
const morgan = require("morgan")
const cors = require("cors")
const songs = require("./routes/songs")
const artists = require("./routes/artists")
const albums = require("./routes/albums")
const playlists = require("./routes/playlists")
const users = require("./routes/users")
const favorites = require("./routes/usersFavorites")
const jwt = require("jsonwebtoken")
app.use(cors())
app.use(morgan(function (tokens, req, res) {
    const myTiny =[tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms']
      return myTiny.join(' ')
  }));
  


  function ensureToken(req, res, next) {
      const bearerHeader = req.headers['token'];
      if (typeof bearerHeader !== 'undefined') {
        const decoded = jwt.decode(bearerHeader);
        console.log(decoded);
        jwt.verify(bearerHeader, process.env.HASH, (error, data) => {
          if (error) {
            res.status(403).send('incoreccet token');
          } else {
            res.token = bearerHeader;
            next();
          }
        })
      } else {
        res.sendStatus(403);
      }
    }
  
  
app.use("/users",users)
app.use(ensureToken);
app.use("/favorites",favorites)
app.use("/songs",songs)
app.use("/albums",albums)
app.use("/playlists",playlists)
app.use("/artists",artists)



module.exports = app;
