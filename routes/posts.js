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
        res.json({data: null});
    }
})


router.get('/posts-get', async (req,res) => {
    try{
        let {id, isGroup} = req.query;

        if(isGroup){
            const posts = await User_Post.findAll({where: {group_id: id}})
            res.json({data: posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))});
        }else{
            const posts = await User_Post.findAll({where: {user_id: id}})
            res.json({data: posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))});
        }

    }catch (e){
        console.log(e);
        res.json({data: null});
    }
})

router.post('/create', async (req,res) => {
    try{
        let {id, content, title, isGroup} = req.body;

        const post = await User_Post.create({
            title: title,
            content: content,
            group_id: isGroup ? id : null,
            user_id: !isGroup ? id : null
        })
        res.json({data: post});
    }catch (e){
        console.log(e);
        res.json({data: null});
    }
})



module.exports = router;
