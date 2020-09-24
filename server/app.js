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

app.use(cors())
app.use(morgan(function (tokens, req, res) {
    const myTiny =[tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms']
      return myTiny.join(' ')
  }));
  

app.use("/songs",songs)
app.use("/users",users)
app.use("/albums",albums)
app.use("/playlists",playlists)
app.use("/artists",artists)



module.exports = app;
