const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        default: '',
    },
    version: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

const Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;
