const express = require('express');
const {Dialog} = require("../migrations");
const {User_Dialog} = require("../migrations");
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const {id} = req.query
        const dialogModels = await User_Dialog.findAll({where: {user_id: id}})
        const dialogIds = dialogModels.map(item => item.dialog_id)
        const dialogs = await Promise.all(dialogIds.map(async (id) => await Dialog.findOne({where: {id}})))

        res.json({data: dialogs});
    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})

router.get('/start-dialog', async (req,res) => {
    try{
        const {id1, id2, title} = req.query

        const dialog = await Dialog.create({
            title,
        })

        await User_Dialog.create({
            dialog_id: dialog.id,
            user_id: id1
        })

        await User_Dialog.create({
            dialog_id: dialog.id,
            user_id: id2
        })


        res.json({data: dialog});
    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})


module.exports = router;
