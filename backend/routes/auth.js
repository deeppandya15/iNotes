const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../modals/User");
const bcrypt = require("bcrypt");

//create a user using: POST "/api/auth/createuser". Doesn't require authentication
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
      // Return the newly created user
      res.json(user);
    } catch (err) {
      // Handle errors
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
