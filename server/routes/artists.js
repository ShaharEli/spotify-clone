const {Router} = require("express");
const router = Router()
const {Artist,Album,Song} = require("../ORM/models")

router.delete("/:id",async(req,res)=>{
    try{
        await Artist.destroy({where:{id:req.params.id}})
        res.json({success:`artist with id ${req.params.id} deleted`})
    }catch(e){res.json({error:e.message})}

})
router.get("/top",async (req,res)=>{
    try{
        const topArtists=await Artist.findAll({
            limit:20
        })
        res.json(topArtists)
    }catch(e){res.json({error:e.message})}
})

router.put("/:id",async (req,res)=>{
    try{
        const updated = await Artist.update(req.body,{
            where:{id:req.params.id}
        })
        updated[1]===0?res.json({0:"updated"}):res.json({1:"updated"})
    }catch(e){
        res.json({error:e.message})
    }
})

router.get("/:id",async (req,res)=>{
    try{
       const artistsData= await Artist.findByPk(req.params.id,{
            include:[{
                model:Song,
                include:[{model:Album,attributes:["name"]}]
            },Album]
        })
        res.json(artistsData)
    }catch(e){res.json({error:e.message})}
})

router.post("/",async(req,res)=>{
  try{
    const {body} =req
    await Artist.create(body)
    res.json({success:"one artist added"})
  }catch(e){res.json({error:e.message})}
})



module.exports = router

router.get("/",async (req,res)=>{
    try{
        const artists = await Artist.findAll()
        res.json(artists)
    }
    catch(e){
        res.json({error:e.message})
    }

})



