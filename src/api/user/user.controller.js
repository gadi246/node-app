const User = require('../../models/User');
const _ = require('lodash');

const register = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ token });
  } catch (e) {
    let error = e;
    let status = 400;
    const isEmailExist = _.get(e, 'keyValue.email');
    if(isEmailExist){
      error = {error: 'Email already exist'};
      status = 409;
    }
    res.status(status).send(error);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findByCredentials({ password, email });
    const token = await user.generateAuthToken();
    res.send({ token });
  } catch (e) {
    res.status(400).send();
  }
};

const logout = async (req, res) => {
  const { user } = req;
  try {
    user.tokens = user.tokens.filter((token) => token.token === req.token);
    await user.save();
    res.send('ok');
  } catch (e) {
    res.status(500).send()
  }
};

const remove = async (req, res) => {
  try {
    await req.user.remove();
    res.send('ok');
  } catch (e) {
    res.status(500).send();
  }
};

const update = async (req, res) => {
  try{
    const fields = req.body;
    Object.keys(fields).forEach(fieldKey => {
      req.user[fieldKey] = fields[fieldKey];
    });
    await req.user.save();
    res.send(req.user);
  }catch(e){

  }
};

const getSelf = async (req, res) => {
  res.send(req.user);
}

const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  }catch (e){
    res.status(500);
  }
}

module.exports = {
  register,
  login,
  logout,
  remove,
  update,
  getSelf,
  getAll
};
