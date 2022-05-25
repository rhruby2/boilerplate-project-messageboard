const {model, Schema} = require('mongoose');

const ReplySchema = new Schema({
    text: {
        type: String,
        required: [true, 'reply text is not provided, yet required']
    },
    created_on: { 
        type: Date, 
        default: Date.now 
    },
    delete_password: {
        type: String,
        required: true
    },
    reported: {
        type: Boolean,
        default: false
    }
});

const Reply = model('reply', ReplySchema);

const ThreadSchema = new Schema({
    board: {
        type: String,
        required: [true, 'board name is not provided, yet required']
    },
    text: {
        type: String,
        required: [true, 'reply text is not provided, yet required']
    },
    created_on: { 
        type: Date, 
        default: Date.now 
    },
    bumped_on: {
        type: Date,
        default: Date.now
    },
    reported: {
        type: Boolean,
        default: false
    },
    replies: {
        type: [ReplySchema],
        default: []
    },
    delete_password: {
        type: String,
        required: true
    }
});

const Thread = model('thread', ThreadSchema);

module.exports = {Thread, Reply};