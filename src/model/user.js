const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add username']
        },
        email: {
            type: String,
            required: [true, 'Please add email address'],
            unique: [true, 'Email is already taken']
        },
        password: {
            type: String,
            required: [true, 'Please add password']
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;