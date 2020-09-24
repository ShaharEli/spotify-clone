const {Router} = require("express");
const router = Router()
const {Artist,Album,Song} = require("../ORM/models")

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

router.get("/",async (req,res)=>{
    try{
        const artists = await Artist.findAll()
        res.json(artists)
    }
    catch(e){
        res.json({error:e.message})
    }

})

router.get("/albums/:id",async (req,res)=>{
      try{
        const albums = await Album.findByPk(`${req.params.id}`,{
            include:[{
                model:Artist,
            }
            ],
            where:{id:req.params.id}
        })
        res.json(albums)
    }
    catch(e){
        res.json({error:e.message})
    }

})
//to complete
router.get("/:id",async (req,res)=>{
    try{
       const artistsSongs= await Song.findAll({
            include:[{
                model:Artist,
                attributes:[
                    "name"
                ]
            }],
            where:{artist_id:req.params.id}
        })
        res.json(artistsSongs)
    }catch(e){res.json({error:e.message})}
    
})

module.exports = router

