const request = require("supertest")
const {Artist} = require("../models")
const artistsMock = [{name: 'shahar'},{name: 'amir'},{name: 'dekel vaknin'}]
const app = require("../../app")
  
describe('testing artists endpoint', () => {
    beforeEach(async () => {
        await Artist.destroy({ truncate: true, force: true });
      });    
    it("get all artist",async (done)=>{
        await Artist.bulkCreate(artistsMock)
        const {body} = await request(app).get("/artists")
        expect(body.length).toBe(3)
        expect(body[0].name).toBe("shahar")
        expect(body[1].name).toBe("amir")
        expect(body[2].name).toBe("dekel vaknin")
        done()
      
    })
    it("post new artist",async (done)=>{
      const {body} = await request(app).post("/artists").send(artistsMock[2])
      expect(body).toEqual({success:"one artist added"})
      const artists =await  Artist.findAll()
      const artist = artists[0]
      expect(artist.name).toBe(artistsMock[2].name)
      done()
    })
})
