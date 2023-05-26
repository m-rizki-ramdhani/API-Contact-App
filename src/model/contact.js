const mongoose = require('mongoose');

const contactShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add contact name']
        },
        email: {
            type: String,
            required: [true, 'Please add email address']
        },
        phone: {
            type: String,
            required: [true, 'Please add phone number']
        }
    },
    {
        timestamps: true,
    }
)

const Contact = mongoose.model('Contact', contactShema)

module.exports = Contact