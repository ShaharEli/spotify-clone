const request = require("supertest")
const {Artist} = require("../models")
const artistsMock = [{name: 'shahar'},{name: 'amir'},{name: 'dekel vaknin'}]
const app = require("../../app")
  
describe('testing artists endpoint', () => {
    beforeEach(async () => {
        await Artist.destroy({ truncate: true, force: true });
      });    
    it("get all artist",async ()=>{
       const results= await Artist.bulkCreate(artistsMock)
        expect(results.length).toBe(3)
        expect(results[0].name).toBe("shahar")
        expect(results[1].name).toBe("amir")
        expect(results[2].name).toBe("dekel vaknin")

    })
})
