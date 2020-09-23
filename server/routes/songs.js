const {Router} = require("express")
const router = Router()

router.delete("/:id",(req,res)=>{
    connection.query(`DELETE FROM songs WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One song deleted");
      });
    
})

router.put("/:id",(req,res)=>{
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

router.post("/",(req,res)=>{
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

router.get("/",(req,res)=>{
    connection.query("SELECT songs.*, albums.name As album, artists.name As artist FROM songs Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id ORDER BY upload_at",  (err, result, fields) =>{
        if (err) res.send("error");
        res.json(result);
      });
    
})

router.get("/top",(req,res)=>{
    connection.query("SELECT songs.*,albums.cover_img as img ,albums.name As album, artists.name As artist FROM songs Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id LIMIT 20",  (err, result) =>{
        if (err) res.send("error");
        res.json(result);
      });
})


app.get("/:id",(req,res)=>{
    connection.query(`SELECT songs.*, albums.name As album, artists.name As artist FROM songs Join artists ON artists.id = songs.artist_id JOIN albums ON albums.id = songs.album_id  WHERE songs.id= ${req.params.id}`,  (err, result, fields) =>{
        if (err) res.send("error");
        res.json(result);
      });
    
})
module.exports = router