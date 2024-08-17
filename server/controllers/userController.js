const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// user register
exports.registerUser = async (req, res) => {
    try {
        // hashing password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: "User Created / Registered successfully!",
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create/register! Try again!" + error.message
        });
    }
}

// batch user registration
exports.registerManyUsers = async (req, res) => {
    const users = req.body.users; // Array of user details { name, email, password }

    try {
        const savedUsers = [];

        for (const userData of users) {
            // Generate a salt and hash the password asynchronously
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(userData.password, salt);

            const newUser = new User({
                name: userData.name,
                email: userData.email,
                password: hash,
            });

            const savedUser = await newUser.save();
            savedUsers.push(savedUser);
        }

        res.status(200).json({
            success: true,
            message: "Users Created / Registered successfully!",
            data: savedUsers,
        });
    } catch (error) {
        console.error('Batch registration error:', error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Failed to create/register users! Try again!",
            error: error.message
        });
    }
};

// user login
exports.userLogin = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({email})
        // if user doesn't exist
        if(!user)
            {
                return res.status(404)
                .json({
                    success: false,
                    message: 'User not found'
                });
            }

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)
        // if the password is incorrect
        if(!checkCorrectPassword) {
            return res.status(401)
            .json({
                success: false,
                message: 'Incorrect email or password'
            }); 
        }

        res.status(200).json({
            success: true,
            message: "User Logged In successfully!",
            data: user,
        });
    } catch (error) {
        res.status(401)
            .json({
                success: false,
                message: 'Login failed!'
            });
    }
}

// batch user login
exports.loginManyUsers = async (req, res) => {
    const users = req.body.users; // Array of user login details { email, password }

    try {
        const loginResults = [];

        for (const userData of users) {
            const user = await User.findOne({ email: userData.email });

            if (!user) {
                loginResults.push({
                    email: userData.email,
                    success: false,
                    message: 'User not found'
                });
                continue;
            }

            const checkCorrectPassword = await bcrypt.compare(userData.password, user.password);
            if (!checkCorrectPassword) {
                loginResults.push({
                    email: userData.email,
                    success: false,
                    message: 'Incorrect email or password'
                });
                continue;
            }

            loginResults.push({
                email: userData.email,
                success: true,
                message: "User Logged In successfully!",
                data: user,
            });
        }

        res.status(200).json({
            success: true,
            message: "Batch login process completed!",
            data: loginResults,
        });
    } catch (error) {
        console.error('Batch login error:', error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: 'Batch login process failed!',
            error: error.message
        });
    }
};

// delete single user
exports.deleteSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'A User Is Deleted Successfully!',
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete this user!'
        });
    }
}

// delete users
exports.deleteUsers = async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No user IDs provided or invalid format!'
        });
    }

    try {
        await User.deleteMany({ _id: { $in: ids } });
        res.status(200).json({
            success: true,
            message: 'Users Deleted Successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete! Error: '+ error.message,
        });
    }
}

// get single user
exports.getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: 'User found!',
            data: user,
        });
    } catch (error) {

        res.status(404).json({
            success: false,
            message: 'User not found!'
        });
    }
}

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        // .limit(5);
        res.status(200).json({
            success: true,
            how_many_huh: users.length,
            message: 'All users are here!',
            data: users,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Could not find any user!'
        });
    }
}