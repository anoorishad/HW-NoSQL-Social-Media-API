const { User, Thought } = require('../models');
const { ObjectId } = require("mongoose").mongo


module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {users};
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req,res) {
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with that ID!'})
        : res.json({ message: 'User deleted'})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { "friends": req.params.friendId}},
            { new: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID!'})
        : res.json({ message: 'Friend Added'})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Delete a friend
    deleteFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { "friends": req.params.friendId }},
            { new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with that ID!'})
        : res.json({ message: 'Friend deleted'})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};