const express = require("express");
const {Group_Post} = require("../migrations");
const {User_Post} = require("../migrations");
const router = express.Router();

router.get('/posts-group-get', async (req,res) => {
    try{
        let {id} = req.query;

        const posts = await Group_Post.findAll({where: {group_id: id}})
        res.json({data: posts});
    }catch (e){
        console.log(e);
        res.json({data: false});
    }
})


router.get('/posts-get', async (req,res) => {
    try{
        let {id} = req.query;

        const posts = await User_Post.findAll({where: {owner_id: id}})
        res.json({data: posts});
    }catch (e){
        console.log(e);
        res.json({data: false});
    }
})

router.post('/create', async (req,res) => {
    try{
        let {id, content, title, isGroup} = req.body;

        let post = null;
        if(isGroup){
            post = await Group_Post.create({
                title: title,
                content: content,
                owner_id: id
            })
        }else{
            post = await User_Post.create({
                title: title,
                content: content,
                group_id: id
            })
        }

        res.json({data: post});
    }catch (e){
        console.log(e);
        res.json({data: false});
    }
})



module.exports = router;
