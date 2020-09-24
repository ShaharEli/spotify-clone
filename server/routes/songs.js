const {Router} = require("express")
const router = Router()
const {Song,Artist,Album} = require("../ORM/models")

router.delete("/:id",async (req,res)=>{
    try{
        await Song.destory({
            where:{id:req.params.id}
        })
        res.json({success:`song with id ${req.params.id} deleted`})
    }catch(e){res.json({error:e.message})}
    
})

router.put("/:id",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        await Song.update(body,{
            where:{id:req.params.id}
        })
        res.json({success:"one song updated"})
    }catch(e){res.json({error:e.message})}
})

router.post("/",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    try{
        await Song.create(req.body)
        res.json({success:"one song added"})
    }catch(e){res.json({error:e.message})}

})

router.get("/",async(req,res)=>{
    try{
        const allSongs= await Song.findAll({
             include:[{
                 model:Artist,
                 attributes:["name"]
             },
             {model:Album,
                attributes:["name"]
            }
         ]
         })
         res.json(allSongs)
     }catch(e){res.json({error:e.message})}

})

router.get("/top",async (req,res)=>{
    try{
        const allSongs= await Song.findAll({
            limit:20,
             include:[{
                 model:Artist,
                 attributes:["name"]
             },
             {model:Album,
                attributes:["name"]
            }
         ]
         })
         res.json(allSongs)
     }catch(e){res.json({error:e.message})}
})


router.get("/:id",async (req,res)=>{
    try{
        const allSongs= await Song.findByPk(req.params.id,{
             include:[{
                 model:Artist,
                 attributes:["name"]
             },
             {model:Album,
                attributes:["name"]
            }
         ]
         })
         res.json(allSongs)
     }catch(e){res.json({error:e.message})}
    
})
module.exports = router




