const asyncHandler = require('express-async-handler');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/*
    @desc Register user
    @route POST /api/user/register
    @access public
*/
const registerUser = asyncHandler( async(req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields is required');
    }
    const userAvailable = await User.findOne({email})
    if (userAvailable) {
        res.status(400)
        throw new Error('Email is already exist');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('Password hash: ' + passwordHash);

    const user = await User.create({username, email, password : passwordHash});
    console.log('Created user: ' + user);
    if (!user) {
        res.status(400)
        throw new Error('User data us not valid');
    }
    res.status(201).json({_id: user.id, username : user.username, email: user.email});
});

/*
    @desc Login user
    @route POST /api/user/login
    @access public
*/
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('Email or Password is required');
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '5h'
            }
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error('email or password not valid')
    }
});

/*
    @desc Current user
    @route POST /api/user/current
    @access private
*/
const currentUser = asyncHandler( async(req, res) => {
    res.status(200).json(req.user)
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
}