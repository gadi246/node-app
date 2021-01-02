const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    name:{
        type: String,
        trim: true
    },
    role:{
        type: String,
        enum:['admin', 'user'],
        default: 'user'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});


userSchema.methods.generateAuthToken = async function () {
    const user = this
    // creates token with the secret string thisismynewcourse and push data which is { _id: user._id.toString() }
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' })
    // pushes the  new token to the db `tokens` field
    user.tokens = user.tokens.concat({ token });
    // save to db
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}

// Hash the plain text password before saving
// this happens when creating a user or updating
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    const {name, email} = userObject;

    return {name, email};
}

const User = mongoose.model('User', userSchema);

module.exports = User;
