const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route api/profile/all
// @desc get all profile
// @access public
router.get("/all", (req, res) => {
    const errors = {};
    Profile.find()
        .populate("user", ["name", "avatar"])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = "There are no profile";
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => {
            errors.noprofile = "There are no profile";
            return res.status(404).json(errors.noprofile);
        });
});
// @route api/profile/handle/:handle
// @desc display profile by handle
// @access public
router.get("/handle/:handle", (req, res) => {
    const errors = {};
    Profile.findOne({
        handle: req.params.handle
    })
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There's no profile for this user";
                return res.status(404).json(errors.noprofile);
            }
            res.json(profile);
        })
        .catch(err => {
            errors.noprofile = "There's no profile for this user";
            return res.status(404).json(errors.noprofile);
        });
});

// @route api/profile/user/:user_id
// @desc display profile by user_id
// @access public
router.get("/user/:user_id", (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.params.user_id
    })
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There's no profile for this user";
                return res.status(404).json(errors.noprofile);
            }

            res.json(profile);
        })
        .catch(err => {
            errors.noprofile = "There's no profile for this user";
            return res.status(404).json(errors.noprofile);
        });
});

// @route api/profile
// @desc display user profile
// @access private
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const errors = {};

        Profile.findOne({
            user: req.user.id
        })
            .populate("user", ["name", "avatar"])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = "There's no profile for this user";
                    return res.status(404).json(errors);
                }

                res.json(profile);
            })
            .catch(err => {
                return res.status(404).json(err);
            });
    }
);

// @route api/profile
// @desc create or edit user profile
// @access private
router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profileFields = {};
        profileFields.social = {};
        profileFields.user = req.user.id;

        const standardFields = [
                "handle",
                "company",
                "location",
                "website",
                "bio",
                "status",
                "githubusername"
            ],
            socialFields = [
                "youtube",
                "twitter",
                "facebook",
                "linkedin",
                "instagram"
            ];

        standardFields.forEach(field => {
            if (req.body[field]) profileFields[field] = req.body[field];
        });

        socialFields.forEach(field => {
            if (req.body[field]) profileFields.social[field] = req.body[field];
        });

        if (typeof req.body.skills !== "undefined") {
            profileFields.skills = req.body.skills.split(",");
        }

        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            if (profile) {
                //update profile
                Profile.findOneAndUpdate(
                    {
                        user: req.user.id
                    },
                    {
                        $set: profileFields
                    },
                    {
                        new: true
                    }
                ).then(profile => {
                    res.json(profile);
                });
            } else {
                //create profile

                Profile.findOne({
                    handle: profileFields.handle
                }).then(profile => {
                    if (profile) {
                        errors.handle = "The handle is already exists";
                        return res.status(400).json(errors);
                    }
                });

                new Profile(profileFields).save().then(profile => {
                    res.json(profile);
                });
            }
        });
    }
);

// @route api/profile/experience
// @desc add experience
// @access private
router.post(
    "/experience",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({
            user: req.user.id
        })
            .then(profile => {
                const newExp = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                };

                //add to exp array
                profile.experience.unshift(newExp);
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(400).json(err));
    }
);

// @route api/profile/education
// @desc add education
// @access private
router.post(
    "/education",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        const { errors, isValid } = validateEducationInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({
            user: req.user.id
        })
            .then(profile => {
                const newEdu = {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                };
                console.log(newEdu);
                profile.education.unshift(newEdu);
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(400).json(err));
    }
);

// @route api/profile/experience/delete/:exp_id
// @desc delete experience
// @access private
router.delete(
    "/experience/:exp_id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        })
            .then(profile => {
                //get remove index
                profile.experience.remove({ _id: req.params.exp_id });
                profile
                    .save()
                    .then(profile => res.json(profile))
                    .catch(err => res.json(err));
            })
            .catch(err => res.status(400).json(err));
    }
);

// @route api/profile/education/delete/:exp_id
// @desc delete education
// @access private
router.delete(
    "/education/:edu_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                profile.education.remove({ _id: req.params.edu_id });
                profile
                    .save()
                    .then(profile => res.json(profile))
                    .catch(err => res.json(err));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route api/profile/
// @desc delete user and profile
// @access private
router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
                User.findOneAndRemove({ _id: req.user.id })
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    }
);
module.exports = router;
