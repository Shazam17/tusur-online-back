const express = require("express");
const {User_Group} = require("../migrations");
const {Group_Post} = require("../migrations");
const {Group} = require("../migrations");
const router = express.Router();

router.get('/group', async (req,res) => {
    try{
        let {id} = req.query;
        let checkRes = await Group.findOne({
            where: {
                id
            }
        })
        if(checkRes){
            res.json({data: checkRes});
        }
    }catch (e){
        console.log(e);
    }
})

router.get('/group-search', async (req,res) => {
    try{
        let {title} = req.query;
        let checkRes = await Group.findAll({
            where: {
                title
            }
        })
        if(checkRes){
            res.json({data: checkRes});
        }
    }catch (e){
        console.log(e);
    }
})

router.post('/groups-create', async (req,res) => {
    try{
        const { groupName, ownerId } = req.body;
        const group = await Group.create({
            title: groupName,
            admin_id: ownerId
        });
        res.json({data: group});
    }catch (e){
        console.log(e);
    }
})

router.get('/group-subscribe', async (req,res) => {
    try{
        let {user_id, group_id} = req.query;
        const response = await User_Group.create({
            user_id,
            group_id
        })
        res.json({data: response });
    }catch (e){
        console.log(e);
    }
})

router.get('/group-unsubscribe', async (req,res) => {
    try{
        let {user_id, group_id} = req.body;
        const res = await User_Group.destroy({where: {
                user_id,
                group_id
            }})
        res.json({data: res });
    }catch (e){
        console.log(e);
    }
})

router.get('/group-posts', async (req,res) => {
    try{
        let {id} = req.query;
        let checkRes = await Group_Post.findAll({
            where: {
                group_id: id
            }
        })
        if(checkRes){
            res.json({data: checkRes});
        }
    }catch (e){
        console.log(e);
    }
})

router.get('/', async (req,res) => {
    try{
        let {id} = req.query;
        const user_groups = await User_Group.findAll({where: {user_id: id}}) || [];
        const groups = await Promise.all(user_groups.map(async (group) => await Group.findOne({where: {id: group.group_id}})))
        console.log(groups)
        res.json({data: groups});
    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})

module.exports = router;
