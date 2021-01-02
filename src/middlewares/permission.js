const permission = (req, res, next) => {
  const {user} = req;
  if(user.role !== 'admin'){
    res.status(403).send('Forbidden')
  }
  next()
}

module.exports = permission;
