const {Router} = require("express")
const router = Router()

router.delete("/:id",(req,res)=>{
    connection.query(`DELETE FROM albums WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One album deleted");
      });
})

router.put("/:id",(req,res)=>{
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

router.post("/",(req,res)=>{
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

router.get("/",(req,res)=>{
    connection.query("select albums.*,artists.name as artist from albums join artists on artists.id=artist_id",  (err, result, fields) =>{
        if (err) res.send("error");
        res.json(result);
      });
})

router.get("/:id",(req,res)=>{
    connection.query(`select albums.*,songs.id as song_id,artists.name as artist,songs.title as song,songs.youtube_link as youtube_link,songs.length as length,songs.track_number as truck_number,songs.upload_at as song_upload_date from albums join artists on artists.id=artist_id join songs on songs.album_id=albums.id where albums.id=${req.params.id}`,  (err, result, fields) =>{
        if (err) res.send("error");
        res.json(result);
      });
    
})



router.get("/",(req,res)=>{
    connection.query("select albums.*,artists.name as artist from albums join artists on artists.id=artist_id LIMIT 20",  (err, result) =>{
        if (err) res.send("error");
        res.json(result);
      });
})

module.exports = router
