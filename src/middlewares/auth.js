const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authMW = async (req, res, next) => {
try{
    const [,token] = req.get('Authorization').split(' ');
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
        throw new Error()
    }

    req.token = token;
    req.user = user;

    next();

} catch(e){
    res.status(401).send('Not authenticated')
}
}

module.exports = authMW;
