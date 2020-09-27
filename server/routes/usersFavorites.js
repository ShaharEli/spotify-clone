const { Router } = require("express");

const router = Router();
const { User_album, User_playlist, User_song, User_artist, Song, Playlist, Album, Artist } = require("../ORM/models");

router.post("/song", async (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    }
    const { body } = req;
    try {
        const newSong  = await User_song.findOne({
            where:{songId:body.songId,email:body.email}
        });
        if(!newSong){
            await User_song.create(body);
            res.json({ success: "one song added" });
        }else{
            res.json({ error: "already in your list" });
        }
    } catch (e) { res.json({ error: e.message }); }
});

router.get("/all/:email", async (req, res) => {
    try {
        const favoriteSongs = await User_song.findAll({
            where: { email: req.params.email },
            include: [
                {
                    model: Song, include: [
                        {
                            model: Album,
                            attributes: [["cover_img", "coverImg"], "name"]
                        },
                        {
                            model: Artist,
                            attributes: ["name"]
                        },
                    ]
                }
            ]
        });
        const favoriteAlbums = await User_album.findAll({
            where: { email: req.params.email },
            include: [
                {
                    model: Album
                    , include: [
                        {
                            model: Artist,
                            attributes: ["name"]
                        }]
                },
            ]
        });

        const favoriteArtists = await User_artist.findAll({
            where: { email: req.params.email },
            include: [
                {
                    model: Artist,
                }
            ]
        });
        const favoritePlaylists = await User_playlist.findAll({
            where: { email: req.params.email },
            include: [
                {
                    model: Playlist,
                }
            ]
        });
        res.json([favoriteSongs, favoriteAlbums, favoriteArtists, favoritePlaylists]);

    } catch (e) { res.json({ error: e.message }); }

});

router.get("/songs/:email", async (req, res) => {
    try {
        const favoriteSongs = await User_song.findAll({
            where: { email: req.params.email },
            include: [
                {
                    model: Song, include: [
                        {
                            model: Album,
                            attributes: [["cover_img", "coverImg"], "name"]
                        },
                        {
                            model: Artist,
                            attributes: ["name"]
                        },
                    ]
                }
            ]
        });
        res.json(favoriteSongs);
    } catch (e) { res.json({ error: e.message }); }

});

router.post("/album", async (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    }
    const { body } = req;
    try {
        const newAlbum  = await User_album.findOne({
            where:{albumId:body.albumId,email:body.email}
        });
        if(!newAlbum){
            await User_album.create(body);
            res.json({ success: "one album added" });
        }else{
            res.json({ error: "already in your list" });
        }
    } catch (e) { res.json({ error: e.message }); }
});

router.post("/playlist", async (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    }
    const { body } = req;
    try {
        const newPlaylist  = await User_playlist.findOne({
            where:{playlistId:body.playlistId,email:body.email}
        });
        if(!newPlaylist){
            await User_playlist.create(body);
            res.json({ success: "one playlist added" });
        }else{
            res.json({ error: "already in your list" });
        }
    } catch (e) { res.json({ error: e.message }); }
});

router.post("/artist", async (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    }
    const { body } = req;
    try {
        const newArtist  = await User_artist.findOne({
            where:{artistId:body.artistId,email:body.email}
        });
        if(!newArtist){
            await User_artist.create(body);
            res.json({ success: "one artist added" });
        }else{
            res.json({ error: "already in your list" });
        }
    } catch (e) { res.json({ error: e.message }); }
});

module.exports = router;
