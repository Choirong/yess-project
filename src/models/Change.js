const mongoose = require('mongoose');

const changeSchema = new mongoose.Schema({
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doc',
        required: true,
    },
    version: {
        type: Number,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
    insertString: {
        type: String,
        default: '',
    },
    deleteCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Change = mongoose.model('Change', changeSchema);

module.exports = Change;
