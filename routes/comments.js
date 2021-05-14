const express = require("express");
const {User,CommentModel} = require("../migrations");

const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const {id} = req.query;
        let data = await CommentModel.findAll({where: {post_id: id}})
        data = await Promise.all(data.map(async item => {
            const owner = await User.findOne({where:{id: item.owner_id}})
            item.dataValues.owner = owner
            return item
        }))
        res.send({data})
    }catch (e) {
        console.log(e)
    }
})

router.post('/create', async (req,res) => {
    try{
        const {post_id,owner_id, text} = req.body;
        const data = await CommentModel.create({
            text,
            owner_id,
            post_id
        })
        res.send({data})
    }catch (e) {
        console.log(e)
    }
})

module.exports = router;
