const jwt = require('jsonwebtoken');
const secret = 'thisshouldbeasecret';

exports.JwtAuth = function (req, res, next) { 
const token = req.cookies.token;
if (!token) return res.status(401).send('Access denied');

try {
  const verifiedJwt = jwt.verify(token, secret);
  req.user = verifiedJwt;
  return next();
} catch (error) {
  res.status(400).send('Invalid token');
}

}



