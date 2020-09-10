const express = require("express")
const app=express()
app.use(express.json())
const mysql = require('mysql');
const morgan = require("morgan")
require("dotenv").config()
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
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "spotify_clone"
  });
connection.connect((err) =>{
    if (err) throw err;
    console.log("Connected to my sql!");
});

app.delete("/song/:id",(req,res)=>{
    connection.query(`DELETE FROM songs WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One song deleted");
      });
    
})

app.put("/song/:id",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `UPDATE songs SET ? WHERE id=${req.params.id}`;    
    connection.query(queryString,body,(err,result)=>{
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 song updated");
        }        
    })
})

app.post("/song",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `INSERT INTO songs SET ?`;
    connection.query(queryString,body , (err, result)=> {
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 song successfully inserted into db");
        }
      });

})

app.get("/songs",(req,res)=>{
    connection.query("SELECT songs.*, albums.name As album, artists.name As artist FROM songs Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id ORDER BY upload_at",  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/song/:id",(req,res)=>{
    connection.query(`SELECT * FROM songs WHERE id= ${req.params.id}`,  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/top_songs",(req,res)=>{
    connection.query("SELECT * FROM songs LIMIT 20",  (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
})

app.delete("/album/:id",(req,res)=>{
    connection.query(`DELETE FROM albums WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One album deleted");
      });
})

app.put("/album/:id",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `UPDATE albums SET ? WHERE id=${req.params.id}`;    
    connection.query(queryString,body,(err,result)=>{
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 album updated");
        }        
    })
})

app.post("/album",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `INSERT INTO albums SET ?`;
    connection.query(queryString,body , (err, result)=> {
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 album successfully inserted into db");
        }
      });

})

app.get("/albums",(req,res)=>{
    connection.query("select albums.*,artists.name as artist from albums join artists on artists.id=artist_id",  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
})

app.get("/album/:id",(req,res)=>{
    connection.query(`SELECT * FROM albums WHERE id= ${req.params.id}`,  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/top_albums",(req,res)=>{
    connection.query("SELECT * FROM albums LIMIT 20",  (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
})

app.delete("/playlist/:id",(req,res)=>{
    connection.query(`DELETE FROM playlists WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One playlist deleted");
      });
})

app.put("/playlist/:id",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `UPDATE playlists SET ? WHERE id=${req.params.id}`;    
    connection.query(queryString,body,(err,result)=>{
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 playlist updated");
        }        
    })
})

app.post("/playlist",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `INSERT INTO playlists SET ?`;
    connection.query(queryString,body , (err, result) =>{
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 playlist successfully inserted into db");
        }
      });

})

app.get("/playlists",(req,res)=>{
    connection.query("SELECT * FROM playlists",  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
})

app.get("/playlist/:id",(req,res)=>{
    connection.query(`SELECT * FROM playlists WHERE id= ${req.params.id}`,  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/top_playlists",(req,res)=>{
    connection.query("SELECT * FROM playlists LIMIT 20",  (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
})

app.delete("/artist/:id",(req,res)=>{
    connection.query(`DELETE FROM artists WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One artist deleted");
      });
})

app.put("/artist/:id",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `UPDATE artists SET ? WHERE id=${req.params.id}`;    
    connection.query(queryString,body,(err,result)=>{
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 artist updated");
        }        
    })
})

app.post("/artist",(req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} =req
    const queryString = `INSERT INTO artists 
            SET ?`;
    connection.query(queryString ,body ,  (err, data)=> {
        if (err) {
            res.send("An error occurred.");
        } else {
            res.send("1 artist successfully inserted into db");
        }
      });
})

app.get("/artists",(req,res)=>{
    connection.query("SELECT * FROM artists",  (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
})

app.get("/artist/:id",(req,res)=>{
    connection.query(`SELECT * FROM artists WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/top_artists",(req,res)=>{
    connection.query("SELECT * FROM artists LIMIT 20",  (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
})

app.listen(8080,()=>{
    console.log("listening on port 8080");
})