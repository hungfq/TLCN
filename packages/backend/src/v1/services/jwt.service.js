/* eslint-disable max-len */
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET_KEY;
if (!secret) throw new Error('ENV "JWT_SECRET_KEY" is required');
// https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
// jwt doesn't return a promise, so we wrap it in a promise here
function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function getSignedToken(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

module.exports = {
  verify,
  getSignedToken,
};
