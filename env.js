require('dotenv').config();

const getEnv = (variable) => {
  const value = process.env[variable];
  return value;
};

const SERVER_PORT = getEnv('SERVER_PORT');
const MAIL = getEnv('MAIL');
const MAILPSW = getEnv('MAILPSW')

module.exports = {
  SERVER_PORT,
  MAIL,
  MAILPSW
};