const express = require("express");
const {Story} = require("../migrations");
const {Photo} = require("../migrations");
const {DocumentModel} = require("../migrations");
const {Dialog} = require("../migrations");
const {Group, User} = require("../migrations");
const router = express.Router();

router.get('/comments', async (req,res) => {
    try{
        const data = await Comment.findAll();
        res.json({data});
    }catch (e){
        console.log(e);
    }
})

router.get('/dialogs', async (req,res) => {
    try{
        const data = await Dialog.findAll();
        res.json({data});
    }catch (e){
        console.log(e);
    }
})

router.get('/documents', async (req,res) => {
    try{
        const data = await DocumentModel.findAll();
        res.json({data});
    }catch (e){
        console.log(e);
    }
})

router.get('/photos', async (req,res) => {
    try{
        const data = await Photo.findAll();
        res.json({data});
    }catch (e){
        console.log(e);
    }
})

router.get('/stories', async (req,res) => {
    try{
        const data = await Story.findAll();
        res.json({data});
    }catch (e){
        console.log(e);
    }
})

router.get('/groups', async (req,res) => {
    try{
        const data = await Group.findAll();
        res.json({data});
    }catch (e){
        console.log(e);
    }
})

router.get('/users', async (req,res) => {
    try{
        const data = await User.findAll()
        res.json({data});
    }catch (e){
        console.log(e);
        res.json({data: false});
    }
})

router.get('/user', async (req,res) => {
    try{
        const {id} = req.query
        const data = await User.findOne({where: {id}})
        res.json({data});
    }catch (e){
        console.log(e);
        res.json({data: false});
    }
})

module.exports = router;
