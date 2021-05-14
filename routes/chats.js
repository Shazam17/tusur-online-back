const express = require("express");
const {Message} = require("../migrations");
const router = express.Router();

router.get('/send-message', async (req,res) => {
    try{
        let {id, text, chat_id} = req.query;
        const message = await Message.create({
            text: text,
            owner_id: id,
            chat_id
        })
        res.json({data: message});
    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})

router.get('/chat-messages', async (req,res) => {
    try{
        let {id} = req.query;
        const messages = await Message.findAll({where: {chat_id: id}})

        res.json({data: messages.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))});
    }catch (e){
        console.log(e);
        res.json({data: false});

    }
})

module.exports = router;
