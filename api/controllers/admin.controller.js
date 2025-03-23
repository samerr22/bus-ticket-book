

import jwt from "jsonwebtoken";
import driver from "../models/driver.js";

export const asignup = async (req, res, next) => {
  const { number, rate,seat,userrole,name,tel,nic,licences,email,password } = req.body;

  

  const newUser = new driver({
    number, rate,seat,userrole,name,tel,nic,licences,email,password
  });

  try {
    await newUser.save();
    res.json("Signup succes");
  } catch (error) {
    next(error);
  }
};

export const asigngin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await driver.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "user Not found" });
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httponly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//user update
export const dupdateUser = async (req, res, next) => {
  
 

 
  try {
    const updatedUser = await driver.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          number: req.body.number,
          rate: req.body.rate,
          licences: req.body.licences,
          seat: req.body.seat,
          userrole: req.body.userrole,
          name: req.body.name,
          tel: req.body.tel,
          nic: req.body.nic,
          licenses: req.body.licenses,
          email: req.body.email,
          password: req.body.password,
          
          


        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }

};

// User account deletion
export const ddeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Get userId from the URL parameter

    // Find and delete the user by their ID
    const deletedUser = await driver.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const singOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const createroot = async (req, res, next) => {
    
  const {  root } = req.body;
  const newroot = new driver({
    root
  });

  try {
      await newroot.save();
      res.json(  ' succes' );
      
  } catch (error) {

     next(error);
      
  }
}


//get all employee
export const geteroot = async (req, res, next) => {
  try {
    

      const root = await driver.find();

      if (root.length > 0) {
        res.json({
          message: " details retrieved successfully",
          Empp,
        });
      } else {
        return next(error(404, " not fonud "));
      }
   
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};