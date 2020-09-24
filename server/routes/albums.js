const {Router} = require("express")
const router = Router()
const {Album,Artist,Song} =require("../ORM/models")

router.delete("/:id",async (req,res)=>{
    try{
        await Album.destory({
            where:{id:req.params.id}
        })
        res.json({success:`album with id ${req.params.id} deleted`})
    }catch(e){res.json({error:e.message})}
})

router.put("/:id",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        await Album.update(body,{
            where:{id:req.params.id}
        })
        res.json({success:"one album updated"})
    }catch(e){res.json({error:e.message})}
})

router.post("/",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        await Album.create(body)
        res.json({success:"one album added"})
    }catch(e){res.json({error:e.message})}

})

router.get("/",async(req,res)=>{
    try{
    const allAlbums = await Album.findAll({
        include: [{
            model: Artist,
            attributes: ["name"]
        }, {
            model: Song,
            include: [
                {
                    model: Artist,
                    attributes: ["name"],
                },
                {
                    model: Album,
                    attributes: ["name"],
                },
            ],
        }
    ]
    });
    res.json(allAlbums)
}catch(e){res.json({error:e.message})}
    

})

router.get("/:id",async (req,res)=>{
    try{
        const album = await Album.findByPk(req.params.id,{
            include:[
                {
                    model:Song,
                    include: [
                        {
                            model: Artist,
                            attributes: ["name"],
                        },
                        {
                            model: Album,
                            attributes: ["name"],
                        },
                    ],
                },
                {
                    model:Artist,
                    attributes:["name"]
                }
            ]
        })
        res.json(album)
    }catch(e){res.json({error:e.message})}   
    
})



router.get("/top",async(req,res)=>{
    try{
        const albums = await Album.findAll({
            limit:20,
            include:[
                {
                    model:Artist,
                    attributes:["name"]
                }
            ]
        })
        res.json(albums)
    }catch(e){res.json({error:e.message})}
})

module.exports = router
