const {Router} = require("express")
const router = Router()


router.delete("/:id",(req,res)=>{
    connection.query(`DELETE FROM artists WHERE id= ${req.params.id}`,  (err, result) =>{
        if (err)  res.send("An error occurred.");
        res.send("One artist deleted");
      });
})
router.get("/top",(req,res)=>{
    connection.query("SELECT * FROM artists LIMIT 20",  (err, result) =>{
        if (err) res.send("error");
        res.json(result);
      });
})

router.put("/:id",(req,res)=>{
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

router.post("/",(req,res)=>{
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

router.get("/",(req,res)=>{
    connection.query("SELECT * FROM artists",  (err, result) =>{
        if (err) res.send("error");
        res.json(result);
      });
})

router.get("/albums/:id",(req,res)=>{
    connection.query(`select albums.* from albums join  artists on artists.id=albums.artist_id where artists.id=${req.params.id}`,  (err, result, fields) =>{
        if (err) res.send("error");
        res.json(result);
      });
})

router.get("/:id",(req,res)=>{
    connection.query(`select songs.*,artists.name,albums.name as album_name,artists.cover_img,artists.uploaded_at as artist_date from songs join artists on songs.artist_id=artists.id join albums on songs.album_id=albums.id where songs.artist_id=${req.params.id}`
    ,  (err, result) =>{
        if (err) res.send("error");
        res.json(result);
      });
    
})

module.exports = router
