const express = require('express');
const {User_Friends} = require("../migrations");
const {User} = require("../migrations");
const router = express.Router();

router.get('/user-friends', async (req,res) => {
    try{
        const {id} = req.query
        const friendModels = await User_Friends.findAll({where: {user_id1: id}})
        const friendIds = friendModels.map(item => item.user_id2)
        const friends = await Promise.all(friendIds.map(async (id) => await User.findOne({where: {id}})))

        res.json({data: friends});

    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})

router.get('/search-friends', async (req,res) => {
    try{
        const {email} = req.query
        const found = await User.findAll({where: {email}})
        res.json({data: found});

    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})

router.get('/add-friend', async (req,res) => {
    try{
        const {id1, id2} = req.query


        await User_Friends.create({
            user_id1: id1,
            user_id2: id2
        })

        await User_Friends.create({
            user_id1: id2,
            user_id2: id1
        })


        res.json({data: true});
    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})



module.exports = router;
