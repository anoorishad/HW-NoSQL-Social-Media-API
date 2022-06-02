const { Schema, model } = require('mongoose');
const { format_date} = require('../utils/helpers')
const reactionSchema  = require('./Reaction')

// Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timeStamp)=> {
                return format_date(timeStamp)
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;