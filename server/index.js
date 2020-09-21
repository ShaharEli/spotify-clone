const express = require("express")
const app=express()
app.use(express.json())
const mysql = require('mysql');
const morgan = require("morgan")
const bcrypt = require('bcrypt');
require("dotenv").config()
const cors = require("cors")
app.use(cors())
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
    database: "spotify_clone",
    multipleStatements: true
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

app.post("/login",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    console.log(body);
    const queryString = `select * from users where users.email="${body.email}"`;
    connection.query(queryString,body , async (err, result)=> {
        if (err) {
            res.send({error:err.message});
        } else {
             await bcrypt.compare(body.password,result[0].password,(err, success)=>{
                if(err){
                    res.json({error:err.message})
                }else if(success){
                    res.json({name:result[0].name,token:result[0].password.slice(0,result[0].password.length/2)+"token"})
                }else{
                    res.json({error:"wrong password"})
                }
             })

        }
      });
})

app.post("/user",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    body.password = await bcrypt.hash(body.password,10)
    const queryString = `INSERT INTO users SET ?`;
    connection.query(queryString,body , (err, result)=> {
        if (err) {
            res.json({error:err.message});
        } else {
            res.json({name:body.name,token:body.password.slice(0,body.password.length/2)+"token"});
        }
      });
})

app.post("/yoursongs",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `INSERT INTO users_songs SET ?`;
    connection.query(queryString,body , (err, result)=> {
        if (err) {
            res.json({error:err.message});
        } else {
            res.json({success:"success"});
        }
      });
})

app.post("/youralbums",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `INSERT INTO users_albums SET ?`;
    connection.query(queryString,body , (err, result)=> {
        if (err) {
            res.json({error:err.message});
        } else {
            res.json({success:"success"});
        }
      });
})

app.post("/yourplaylists",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `INSERT INTO users_playlists SET ?`;
    connection.query(queryString,body , (err, result)=> {
        if (err) {
            res.json({error:err.message});
        } else {
            res.json({success:"success"});
        }
      });
})

app.post("/yourartists",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    const queryString = `INSERT INTO users_artists SET ?`;
    connection.query(queryString,body , (err, result)=> {
        if (err) {
            res.json({error:err.message});
        } else {
            res.json({success:"success"});
        }
      });
})

app.get("/checkmail/:email",async (req,res)=>{
    const email = req.params.email
    if (!email){
        res.status(400).send("content missing")
    }
    const queryString = `Select * from users where users.email="${email}"`;
    connection.query(queryString, (err, result)=> {
        if (err) {
            console.log("Dcdscdscd");
            res.send("error");
        } else {
            if(result.length===0){
                res.json({"emailOk":true})
            }else{
                res.json({"emailOk":false,"name":result[0].name,"token":result[0].password.slice(0,result[0].password.length/2)+"token"})
            }
        }
      });
})

app.get("/songs",(req,res)=>{
    connection.query("SELECT songs.*, albums.name As album, artists.name As artist FROM songs Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id ORDER BY upload_at",  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/allfavorites/:email",async (req,res)=>{
     connection.query(`select songs.* ,albums.cover_img as img ,albums.name As album, artists.name As artist from users_songs join songs on songs.id = users_songs.song_id  Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id where email ="${req.params.email}" ORDER BY upload_at;
     select albums.*,artists.name as artist from users_albums join albums on albums.id = users_albums.album_id join artists on artists.id=artist_id where email ="${req.params.email}" ORDER BY upload_at;
     select artists.* from users_artists join artists on artists.id = users_artists.artist_id where email ="${req.params.email}" ORDER BY uploaded_at;
     select playlists.* from users_playlists join playlists on playlists.id = users_playlists.playlist_id where email ="${req.params.email}" ORDER BY uploaded_at;
     `,  (err, results) =>{
        if (err) throw err;
        res.json(results);
    });
    
})
app.get("/favorites_songs/:email",async (req,res)=>{
    connection.query(`select songs.* ,albums.cover_img as img ,albums.name As album, artists.name As artist from users_songs join songs on songs.id = users_songs.song_id  Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id where email ="${req.params.email}" ORDER BY upload_at;`,  (err, result) =>{
       if (err) throw err;
       res.json(result);
   });
   
})



app.get("/song/:id",(req,res)=>{
    connection.query(`SELECT songs.*, albums.name As album, artists.name As artist FROM songs Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id  WHERE songs.id= ${req.params.id}`,  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/top_songs",(req,res)=>{
    connection.query("SELECT songs.*,albums.cover_img as img ,albums.name As album, artists.name As artist FROM songs Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id LIMIT 20",  (err, result) =>{
        if (err) throw err;
        res.json(result);
      });
})


app.get("/albumByArtistId/:id",(req,res)=>{
    connection.query(`select albums.* from albums join  artists on artists.id=albums.artist_id where artists.id=${req.params.id}`,  (err, result, fields) =>{
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
    connection.query(`select albums.*,songs.id as song_id,artists.name as artist,songs.title as song,songs.youtube_link as youtube_link,songs.length as length,songs.track_number as truck_number,songs.upload_at as song_upload_date from albums join artists on artists.id=artist_id join songs on songs.album_id=albums.id where albums.id=${req.params.id}`,  (err, result, fields) =>{
        if (err) throw err;
        res.json(result);
      });
    
})

app.get("/top_albums",(req,res)=>{
    connection.query("select albums.*,artists.name as artist from albums join artists on artists.id=artist_id LIMIT 20",  (err, result) =>{
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
    connection.query(`SELECT songs.*, albums.name AS album,artists.name AS artist,playlists.name AS playlist,playlists.id as playlist_id,playlists.uploaded_at as playlist_date,playlists.cover_img FROM songs JOIN artists ON artists.id=songs.artist_id JOIN albums ON albums.id=songs.album_id JOIN list_of_songs ON list_of_songs.song_id=songs.id JOIN playlists ON playlists.id=${req.params.id} WHERE list_of_songs.playlist_id=${req.params.id}`
    ,  (err, result, fields) =>{
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
    connection.query(`select songs.*,artists.name,albums.name as album_name,artists.cover_img,artists.uploaded_at as artist_date from songs join artists on songs.artist_id=artists.id join albums on songs.album_id=albums.id where songs.artist_id=${req.params.id}`
    ,  (err, result) =>{
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