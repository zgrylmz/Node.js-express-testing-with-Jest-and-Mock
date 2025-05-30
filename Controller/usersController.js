const Users = require("../Model/usersModel");
const mongoose = require("mongoose");

module.exports.getAllUsers = async(req,res)=>{

    try {
        const allUsers = await Users.find();
        res.status(200).json(allUsers);    
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports.saveNewUser = async(req,res)=>{
    const {mail,password,job} = req.body;

    try {
    const newUser = await Users.create({mail,password,job});
    res.status(200).json(newUser);    
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports.deleteUser = async(req,res)=>{
    const id = req.params.id;

    try {
    const deletedUser = await Users.findByIdAndDelete(id);
    res.status(200).json(deletedUser);    
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports.updateUser = async(req,res)=>{
    const id = req.params.id
    
    try {
         const findUserAndReplace = await Users.findByIdAndUpdate(id, req.body);
         if (!findUserAndReplace) return res.status(404).json({ error: "User not found" });
         const updatedUser = await Users.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
            res.status(400).json({error:error.message});
    }
}