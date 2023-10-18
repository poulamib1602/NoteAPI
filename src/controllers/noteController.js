const { model } = require('mongoose');
const noteModel =  require('../models/note');

const createNote = async (req,res) =>{
    console.log(req)
    // Bearer and then the token
    const {title, description} = req.body;

    const newNote = new noteModel({
        title : title,
        description : description,
        userId : req.userid
    });
     // db conection
    try {
        await newNote.save();
        res.status(201).json(newNote)
    } catch (error) {

        console.log(error)
        res.status(500).json({message: "something went wrong"})
        
    }
}

const updateNote = async (req,res) =>{
    const id =req.params.id;
    const {title, description} = req.body;

    const newNote = {
        title : title,
        description: description,
        userId: req.userid
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, {new:true})
        res.status(201).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "something went wrong"})
        
    }

    
}

const deleteNote = async (req,res) =>{
    const id =req.params.id;

    try {
        const note = await noteModel.findByIdAndRemove(id);
        res.status(201).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "something went wrong"})
        
    }
}

const getNote = async (req,res) =>{
    try {
        const notes = await noteModel.find({userId: req.userid});
        res.status(200).json(notes);
    } catch (error) {
        
        console.log(error)
        res.status(500).json({message: "something went wrong"})
        
    }
    
}


module.exports = {createNote, updateNote, deleteNote, getNote}