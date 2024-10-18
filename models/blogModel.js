const mongoose = require('mongoose');

const subContentSchema = new mongoose.Schema({
    subheading: {
        type: String,
        // required: true
    },
    content: {
        type: String,
        // required: true
    }
});

const blogSchema = new mongoose.Schema({
    heading: {
        type: String,
        // required: true
    },
    mainContent: {
        type: String,
        // required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    subContents: [subContentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);
