const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'NoteAPI'
const signup = async (req, res) =>{
    const {username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if (existingUser){
            return res.status(400).json({message : "User already exists"});
        }
        logger.info(username, email, password )
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await userModel.create({
            email: email,
            password:hashedPassword,
            username : username
        });

        const token = jwt.sign( {
            email : result.email, 
            id: result._id
        }, SECRET_KEY)

        res.status(201).json({user: result, token : token})
    } catch (error) {
        logger.error(error)
        res.status(500).json({message:"somethig went wrong"})
    }
}
const signin = async (req,res) =>{
    const {username , email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if (!existingUser){
            return res.status(404).json({message : "User not found"});
        }
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchedPassword){
            return res.status(400).json({message : "Invalid credientials"})
        }
        const token = jwt.sign( {
            email : existingUser.email, 
            id: existingUser._id
        }, SECRET_KEY)
        res.status(201).json({user: existingUser, token : token , message : "logged in sucessfully"})  
    } catch (error) {
        logger.error(error)
        res.status(500).json({message:"somethig went wrong"});
    }
}


module.exports = { signin, signup}