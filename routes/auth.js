const express = require("express");
const {User} = require("../migrations");
const router = express.Router();

router.post('/login', async (req,res) => {
    try{
        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        const userFound = await User.findOne({
            where: {
                email,
                password
            }})
        if(userFound){
            res.json({payload: {id:userFound.id, email:userFound.email,user: userFound},error:false});
        } else {
            res.json({payload: {},error:'wrong user data'});
        }
    }catch (e) {
        console.log(e)
    }

})

router.post('/register', async (req,res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({
        where: {
            email: email
        }})
    console.log(userFound);
    if(userFound){
        res.json({payload: {},error:true});
    }else{
        await User.create({
            first_name: "",
            second_name: "",
            email: email,
            password: password,
            birthday: new Date(),
            avatar_url: "",
        });
        res.json({payload: {},error:false});
    }
})

module.exports = router;
