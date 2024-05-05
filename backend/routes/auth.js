const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../modals/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "deeppandya123456";

// Route:1 create a user using: POST "/api/auth/createuser". No login requireds
router.post(
  "/createuser",
  [
    // Validation middleware for name, password, and email fields
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("password", "Enter valid password").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Return validation errors if any
        return res.status(400).json({ errors: errors.array() });
      }

      // If validation passes, check if user with provided email exists
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        // If user already exists, return an error response
        return res
          .status(400)
          .json({ error: "Sorry User with this email address already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      console.log("salt===" + salt);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user if email is unique
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const authToken = jwt.sign({ userid: user._id }, JWT_SECRET);
      console.log(authToken);

      // Return the newly created user
      res.json(authToken);
    } catch (err) {
      // Handle errors
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route:2  login a user using: POST "/api/auth/login". no Login required
router.post("/login", [
  // Validation middleware for name, password, and email fields
  body("password", "Enter valid password").isLength({ min: 5 }),
  body("email", "Enter valid email").isEmail(),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors if any
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(email);
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credintials." });
      }
      const passComp = await bcrypt.compare(password, user.password);
      if (!passComp) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credintials." });
      }

      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign({ userid: user._id }, JWT_SECRET);
      res.json(authToken);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
]);

// Route:3  get loggedin  user details using: POST "/api/auth/getuser".  Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user;
    const user = await User.findById(userId).select("-password");
    console.log(user);
    res.send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
