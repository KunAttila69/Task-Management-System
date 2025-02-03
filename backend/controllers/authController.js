const User = require("../models/User")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = async (req,res) => {
    const {name, email, password} = req.body
    try{
        const hashedPassword = await bycrypt.hash(password, 10)
        const user = await User.create({name,email,password: hashedPassword})
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(201).json({token})
    }
    catch (error) {
        res.status(400).json({ message: "User registration failed", error });
    }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})

        if(!user) return res.status(404).json({message: "User not found"})

        const isMatch = await bycrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).json({message: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(200).json({ token });
    }
    catch (error){
        res.status(400).json({ message: "Login failed"}, error)
    }
}

module.exports = {registerUser, loginUser}