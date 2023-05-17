const { users } = require("../models");
const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Create new user
exports.signUp = async (req, res) => {
        try {// Validate request
        console.log(req.body, 'body')
        if (!req.body.username || !req.body.password ) {
            return res.status(400).json({ message: "Content can not be empty!" });
            ;
        }
        
            const existingUser = await Users.findOne({username: req.body.username})
	    console.log(existingUser, 'eu')
        
         if (existingUser) {
             return res.json({message: 'User already exist!'})
         }
    
        const salt = await bcrypt.genSalt(10)
        const hashPwd =  await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPwd
        const user = new Users(req.body)
        
        user
        .save(user)
        .then(data => {
        //res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the user."
        });
        });
    
        const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY,{expiresIn: process.env.EXPIRE})
    
        return res.cookie({'token': token}).json({success: true, message: 'User resgistered sucesssfully', data: user})
    } catch (error) {
        console.log(error)
        return res.json({error: error})
    }
}

exports.signIn = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password ) {
            res.status(400).send({ message: "Content can not be empty!" });
            return res.json({error: 'Content can not be empty!'});
        }
        const {username, password} = req.body
        const existingUser = await Users.findOne({username: req.body.username})
           
        if (!existingUser) {
        res.status(404).send({
            message:
                err.message || "User not found."
            });
        }

        const correctPwd = await bcrypt.compare(password, existingUser.password)
        if (!correctPwd) {
            res.status(401).send({ message: "Invalid password!" }); 
        }

	const token = await jwt.sign({id: existingUser.id}, process.env.SECRET_KEY,{expiresIn: process.env.EXPIRE})

        return res.cookie('token', token).json({success: true, message: 'User logged in sucesssfully'})

    } catch (error) {
	console.log(error)
        return res.json({error: error})
    }
  };
