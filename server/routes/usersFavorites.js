const {Router} = require("express")
const router = Router()
const {User,User_album,User_playlist,User_song,User_artist,Song,Playlist} = require("../ORM/models")

router.post("/song",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        await User_song.create(body)
        res.json({success:"one song added"})
    }catch(e){res.json({error:e.message})}
})
router.get("/all/:email",async (req,res)=>{
    try{
        const favoriteSongs = await User_song.findAll({
            where:{email:req.params.email},
            include:[
                {
                    model:Album,
                    attributes:[["cover_img","img"],["name","album"]]
                },
                {
                    model:Artist,
                    attributes:[["name","artist"]]    
                },
                {
                    model:Song
                }
            ]
        })
        const favoriteAlbums = await User_album.findAll({
            where:{email:req.params.email},
            include:[
                {
                    model:Album
                },
                {
                    model:Artist,
                    attributes:[["name","artist"]]    
                }
            ]
        })
        const favoriteArtists = await User_artist.findAll({
            where:{email:req.params.email},
            include:[
                {
                    model:Artist,
                }
            ]
        })
        const favoritePlaylists = await User_playlist.findAll({
            where:{email:req.params.email},
            include:[
                {
                    model:Playlist,
                }
            ]
        })
        res.json([favoriteSongs,favoriteAlbums,favoriteArtists,favoritePlaylists])
        
    }catch(e){res.json({error:e.message})}
   
})
router.get("/songs/:email",async (req,res)=>{
    try{
        const favoriteSongs = await User_song.findAll({
            where:{email:req.params.email},
            include:[
                {
                    model:Album,
                    attributes:[["cover_img","img"],["name","album"]]
                },
                {
                    model:Artist,
                    attributes:[["name","artist"]]    
                },
                {
                    model:Song
                }
            ]
        })
        res.json(favoriteSongs)
    }catch(e){res.json({error:e.message})}
   
})


router.post("/album",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        await User_album.create(body)
        res.json({success:"one album added"})
      }catch(e){res.json({error:e.message})}
})

router.post("/playlist",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        await User_playlist.create(body)
        res.json({success:"one playlist added"})
      }catch(e){res.json({error:e.message})}
})

router.post("/artist",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    try{
        const {body} =req
        await User_artist.create(body)
        res.json({success:"one artist added"})
      }catch(e){res.json({error:e.message})}
})

module.exports = router
