const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../modules/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const { json } = require("express");

const Jwt_secret = "Haker";

// Rout 1: ----------Thise POST request is FOR Create USER----------
const succses = false;
router.post(
  "/createuser",
  //thise is validator use
  [
    body("email", "email should be correct").isEmail(),
    body("passward", "password must be at least contain 5 character").isLength({
      min: 5,
    }),
    body("name", "Name should be contain at least 3 character").isLength({
      min: 3,
    }),
  ],

  // here we get the the value entered by user in request
  // async function is for priority
  async (req, res) => {
    //Here we see any validator error of user That we specifie on top
    //we accsess by error variable
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // we create a user (send value to user db) and
    // check weather user exsist already by email unique or not
    try {
      // searching for user with same email in db
      let user = await User.findOne({ email: req.body.email });

      // IF same User found then if statemant handle
      if (user) {
        return res
          .status(400)
          .json({succses, err: "The eMail You entered is already exsist" });
      }

      // For creating sequre Passward ganrate salt and add theme
      // await simply means wait for resolves
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.passward, salt);

      // Create user and save also
      user = await User.create({
        email: req.body.email,
        passward: secPass,
        name: req.body.name,
      });

      // storing user id in data variable
      const data = {
        user: {
          id: user.id,
        },
      };

      // NOW we create a sequre Tocken for user by jwt(jsonwebtoken)
      const AuthToken = jwt.sign(data, Jwt_secret);
      res.json({succses:true, AuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured createuser");
    }
  }
);

// ROUT: 2-------------Thise Post Route For LOGIn A user------
router.post(
  "/login",
  [
    // validating email only
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, passward } = req.body;
    try {
      // check if the email user entered is exsist in database or not
      let user = await User.findOne({ email });

      // if not exsist
      if (!user) {
        return res
          .status(400)
          .json({ err: "Enter your detail with right cradintial !" });
      }

      // For compare hasing passward we need to use bcript method
      const passwardCompare = await bcrypt.compare(passward, user.passward);

      // If passward  mismatch
      if (!passwardCompare) {
        return res
          .status(400)
          .json({succses, err: "Enter your detail with right cradintial pass!" });
      }

      // storing user id in data variable for auth-token
      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(data, Jwt_secret);

      res.status(200).json({succses:true, AuthToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured login");
    }
  }
);

// ROUT:3----------THISE POST REQUEST IS FOR GETTING INFORMATION OF LOGGING USER or ACCSESS DB-----------
// fetchUser is middleware module that take parameter (Req,res,next) and do some function
router.post("/getuser", fetchUser, async (req, res) => {
  try {
   const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error getuser");
  }
});
module.exports = router;
