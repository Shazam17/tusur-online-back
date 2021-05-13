const express = require("express");
const {Story} = require("../migrations");
const router = express.Router();

router.get('/get', async (req, res) => {
    try{
        let {id} = req.query;
        const stories = await Story.findAll({where: {owner_id: id}})
        res.send({data: stories})
    }catch (e){
        console.log(e);
    }
})

router.post('/create', async (req, res) => {
    try{
        let {id, url} = req.body;
        const story = await Story.create({owner_id: id, photo: url})
        res.send({data: story})
    }catch (e){
        console.log(e);
    }
})


module.exports = router;
