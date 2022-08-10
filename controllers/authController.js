const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    const {firstName, lastName, middleName, email, bitcoinAddress, password, isAdmin} = req.body;
    try {
        const emailExist = await User.findOne({email})
        if (emailExist) {
            res.status(400).json({error: 'Email already exist.'})
        } else{
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await User.create({
            firstName, 
            lastName, 
            middleName, 
            email,
            bitcoinAddress,
            password: hashedPassword,
            role: isAdmin && 'admin'
            });
            
            // if (user) {
            res.status(201).json({error: null, data: user})
            // }
        }
    } catch (err) {
        res.status(400).json({data: null, error: err})
        // console.log(error)
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    try {        
        const user = await User.findOne({email})
        if(!user) {
            res.status(400).json({msg: 'Invalide Credenntials'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            res.status(400).json({msg: 'Invalide Credenntials'})
        }
        const accessToken = jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.JWT_SECRET, {expiresIn: "12h"});
        res.status(200).json({error: null, data : {accessToken, user}})
    } catch (err) {
        // res.status(401).json({data: null, error: err})
        console.log(err)
    }
};

const refreshToken = (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });
  
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please Login or Register" });
  
        const accesstoken = createAccessToken({ id: user.id });
  
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

const logout = async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

module.exports = {register, login, logout}