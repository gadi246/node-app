const logger = (req, res, next) => {
  console.log('Incoming');
  next();
}

module.exports = logger;
