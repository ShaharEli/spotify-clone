const express = require("express")
const app=express()
app.use(express.json())
const mysql = require('mysql');
const morgan = require("morgan")
app.use(morgan(function (tokens, req, res) {
    const myTiny =[tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms']
      return myTiny.join(' ')
  }));
  
const  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "99876555",
    database: "spotify_clone"
  });
connection.connect((err) =>{
    if (err) throw err;
    console.log("Connected to my sql!");
});
// connection.query("SELECT * FROM artists",  (err, result, fields)=> {
//     if (err) throw err;
//     console.log(result);
//   });

app.post("/songs",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const { youtube_link, album_id, artist_id, title, length, track_number, lyrics,created_at ,  upload_at} = req.body;
    const queryString = `INSERT INTO songs (youtube_link, album_id, artist_id, title, length, track_number,lyrics,upload_at,created_at) VALUES ("${youtube_link}", "${album_id}" , "${artist_id}", "${title}", "${length}", "${track_number}","${lyrics}","${created_at}" , "${upload_at}")`;
    connection.query(queryString, function (err, result) {
        if (err) {
            // Throw your error output here.
            console.log("An error occurred.");
        } else {
            // Throw a success message here.
            console.log("1 record successfully inserted into db");
        }
      });

})


app.post("/artist",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {name,cover_img, uploaded_at} =req.body
    const sql = `INSERT INTO artists 
            (
                name, cover_img, uploaded_at
            )
            VALUES
            (
                ?, ?, ?
            )`;
    connection.query(sql, [name , cover_img, uploaded_at], function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("success");
    }
});
})


app.listen(8080,()=>{
    console.log("listening on port 8080");
})