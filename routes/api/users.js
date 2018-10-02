const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// models
const User = require("../../models/User");

// @route api/users/register
// @desc register user
// @access public
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        // if user exist
        if (user) {
            return res.status(400).json({
                error: "Email already exist"
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200", //size
                r: "pg", //rating
                d: "mm" //default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route api/users/login
// @desc login user
// @access public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email
    }).then(user => {
        if (!user) {
            errors.login = "Incorrect credentials";
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //return jwt token
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        return res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                errors.login = "Incorrect credentials";
                return res.status(404).json(errors);
            }
        });
    });
});

// @route api/users/current
// @desc return current user
// @access private
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);

module.exports = router;
