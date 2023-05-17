const { users } = require("../models");
const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Create new user
exports.signUp = (req, res) => {
    try {
        // Validate request
        if (!req.body.username || !req.body.password ) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
          
          const existingUser = async() => await Users.findOne({username: req.body.username})
           
          if (existingUser) {
              return res.json({message: 'User already exist!'})
          }
      
          const salt = async () => await bcrypt.genSalt(10)
          const hashPwd = async ()  => await bcrypt.hash(req.body.password, salt)
          req.body.password = hashPwd
          const user = new User(req.body)
          
          user
          .save(user)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
          });
      
          const token = async () => await jwt.sign({id: user.id}, process.env.SECRET_KEY,{expiresIn: process.env.EXPIRE})
      
          return res.cookie({'token': token}).json({success: true, message: 'User resgistered sucesssfully', data: user})
    } catch (error) {
        return res.json({error: error})
    }
    
}

exports.signIn = (req, res) => {
    try {
        if (!req.body.username || !req.body.password ) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        const {username, password} = req.body
        const existingUser = async() => await Users.findOne({username: req.body.username})
           
        if (!existingUser) {
        res.status(404).send({
            message:
                err.message || "User not found."
            });
        }

        const correctPwd = async () => await bcrypt.compare(password, existingUser.password)
        if (!correctPwd) {
            res.status(401).send({ message: "Invalid password!" }); 
        }

        return res.cookie({'token': token}).json({success: true, message: 'User logged in sucesssfully', data: user})

    } catch (error) {
        return res.json({error: error})
    }
  };