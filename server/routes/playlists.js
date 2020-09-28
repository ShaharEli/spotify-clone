const { Router } = require("express");
const { Playlist, Playlists_song, Artist, Album, Song } = require("../ORM/models");

const router = Router();


router.get("/top", async (req, res) => {
    try {
        const topPlaylist = await Playlist.findAll({ limit: 20 });
        res.json(topPlaylist);
    } catch (e) { res.json({ error: e.message }); }
});

router.delete("/:id", async (req, res) => {
    try {
        await Playlist.destroy({
            where: { id: req.params.id }
        });
        res.json({ success: `playlist with id ${req.params.id} deleted` });
    } catch (e) { res.json({ error: e.message }); }
});

router.put("/:id", async (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    }
    const { body } = req;
    try {
        await Playlist.update(body, {
            where: { id: req.params.id }
        });
        res.json({ success: "one playlist updated" });
    } catch (e) { res.json({ error: e.message }); }
});

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send("content missing");
    }
    const { body } = req;
    try {
        await Playlist.create(body);
        res.json({ success: "one playlist added" });
    } catch (e) { res.json({ error: e.message }); }

});

router.get("/", async (req, res) => {
    try {
        const playlists = await Playlist.findAll();
        res.json(playlists);
    } catch (e) { res.json({ error: e.message }); }
});

router.get("/:id", async (req, res) => {
    try {
        const result = await Playlist.findByPk(req.params.id, {
            include: [
                {
                    model: Playlists_song,
                    where: { playlist_id: req.params.id },

                    include: [
                        {
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
                    ],
                    attributes: ['id']
                }
            ]
        });
        for (let i = 0; i < result.Playlists_songs.length; i++) {
            result.Playlists_songs[i] = result.Playlists_songs[i].Song;
        }
        res.json(result);
    } catch (e) { res.json({ error: e.message }); }



});



module.exports = router;
