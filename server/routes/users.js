const {Router} = require("express")
const router = Router()
const bcrypt = require('bcrypt');
const {User,User_album,User_playlist,User_song,User_artist,Song,Playlist} = require("../ORM/models")
router.post("/login",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        const user = await User.findOne({email:body.email})
        await bcrypt.compare(body.password,user.password,(err, success)=>{
            if(err){
                res.json({error:err.message})
            } else if(success){
                res.json({name:user.name,token:user.password.slice(0,user.password.length/2)+"token"})
            }else{
                res.json({error:"wrong password"})
            }
        })
    }catch(e){res.json({error:e.message})}
})

router.post("/register",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    body.password = await bcrypt.hash(body.password,10)
    try{
        await User.create(body)
        res.json({name:body.name,token:body.password.slice(0,body.password.length/2)+"token"});
    }catch(e){res.json({error:e.message})}
})

router.post("/songs",async (req,res)=>{
    if (!req.body){
        res.status(400).send("content missing")
    }
    const {body} = req;
    try{
        await User_song.create(body)
        res.json({success:"one song added"})
    }catch(e){res.json({error:e.message})}
})
router.get("/allfavorites/:email",async (req,res)=>{
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
router.get("/favorites_songs/:email",async (req,res)=>{
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

router.get("/checkmail/:email",async (req,res)=>{
    const email = req.params.email
    if (!email){
        res.status(400).send("content missing")
    }
    try{
        const result = await User.findOne({
            where:{email:email}
        })
        if(!result){
            res.json({"emailOk":true})
        }else{
            res.json({"emailOk":false,"name":result[0].name,"token":result[0].password.slice(0,result[0].password.length/2)+"token"})
        }
    }catch(e){res.json({error:e.message})}
})

module.exports = router
