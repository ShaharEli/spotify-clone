const {Router} = require("express")
const router = Router()


router.delete("/:id",(req,res)=>{
    connection.query(`DELETE FROM playlists WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One playlist deleted");
      });
})

router.put("/:id",(req,res)=>{
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

router.post("/",(req,res)=>{
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

router.get("/",(req,res)=>{
    connection.query("SELECT * FROM playlists",  (err, result, fields) =>{
        if (err) res.send("error");
        res.json(result);
      });
})

router.get("/:id",(req,res)=>{

        connection.query(`SELECT songs.*, albums.name AS album,artists.name AS artist,playlists.name AS playlist,playlists.id as playlist_id,playlists.uploaded_at as playlist_date,playlists.cover_img FROM songs JOIN artists ON artists.id=songs.artist_id JOIN albums ON albums.id=songs.album_id JOIN list_of_songs ON list_of_songs.song_id=songs.id JOIN playlists ON playlists.id=${req.params.id} WHERE list_of_songs.playlist_id=${req.params.id}`
        ,  (err, result, fields) =>{
            if (err) res.send("error");
            res.json(result);
          })
    
    
})

router.get("/top",(req,res)=>{
    connection.query("SELECT * FROM playlists LIMIT 20",  (err, result) =>{
        if (err) res.send("error");
        res.json(result);
      });
})



module.exports = router
