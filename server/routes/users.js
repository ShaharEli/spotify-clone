const {Router} = require("express")
const router = Router()
const bcrypt = require('bcrypt');


router.post("/login",async (req,res)=>{
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

router.post("/register",async (req,res)=>{
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

router.post("/songs",async (req,res)=>{
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
router.get("/allfavorites/:email",async (req,res)=>{
    connection.query(`select songs.* ,albums.cover_img as img ,albums.name As album, artists.name As artist from users_songs join songs on songs.id = users_songs.song_id  Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id where email ="${req.params.email}" ORDER BY upload_at;
    select albums.*,artists.name as artist from users_albums join albums on albums.id = users_albums.album_id join artists on artists.id=artist_id where email ="${req.params.email}" ORDER BY upload_at;
    select artists.* from users_artists join artists on artists.id = users_artists.artist_id where email ="${req.params.email}" ORDER BY uploaded_at;
    select playlists.* from users_playlists join playlists on playlists.id = users_playlists.playlist_id where email ="${req.params.email}" ORDER BY uploaded_at;
    `,  (err, results) =>{
       if (err) res.send("error");
       res.json(results);
   });
   
})
router.get("/favorites_songs/:email",async (req,res)=>{
    connection.query(`select songs.* ,albums.cover_img as img ,albums.name As album, artists.name As artist from users_songs join songs on songs.id = users_songs.song_id  Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id where email ="${req.params.email}" ORDER BY upload_at;`,  (err, result) =>{
        if (err) res.send("error");
       res.json(result);
   });
   
})


router.post("/albums",async (req,res)=>{
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

router.post("/playlists",async (req,res)=>{
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

router.post("/artists",async (req,res)=>{
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

router.get("/checkmail/:email",async (req,res)=>{
    const email = req.params.email
    if (!email){
        res.status(400).send("content missing")
    }
    const queryString = `Select * from users where users.email="${email}"`;
    connection.query(queryString, (err, result)=> {
        if (err) {
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

module.exports = router
