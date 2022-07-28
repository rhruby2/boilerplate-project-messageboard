//https://blog.contactsunny.com/tech/hide-properties-of-mongoose-objects-in-node-js-json-responses#:~:text=The%20solution%20is%20to%20define%20a%20custom.toJSON%20%28%29,following%20piece%20of%20code%20in%20the%20schema%20class%3A

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
    replycount: {
        type: Number,
        default: 0
    },
    delete_password: {
        type: String,
        required: [true, 'password is not provided, yet required']
    }
});

const Thread = model('thread', ThreadSchema);

module.exports = {Thread, Reply};