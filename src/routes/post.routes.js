const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require('../models/user.model');

router.post('/create', async (req,res)=> {

  const token = req.cookies.token;
  if(!token)
  {
  return  res.status(401).json({
      message : "Unauthorized"
    })
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  }
  catch(err) {
    return res.status(401).json({
      message : "Token is invalid"
    });
  }

  try {
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    console.log(user);
  } catch (err) {
    return res.status(500).json({
      message: "Unable to look up user"
    });
  }

  return res.send("Post created successfully")
})

module.exports=router;