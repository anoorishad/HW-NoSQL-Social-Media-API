const { Course } = require('../../UW-VIRT-FSF-FT-03-2022-U-LOL/week-09/18-NoSQL/01-Activities/28-Stu_Mini-Project/Main/models');
const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(courses))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //  Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(course))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ message: 'Thought deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
};