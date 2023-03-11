const jwt = require("jsonwebtoken");


const jwSecret = process.env.SECRET_TOKEN

function generateToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      user_id: user.user_id
    },
    jwSecret,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwSecret, (err, user) => {
            if(err) {
                return res.status(403).json({
                    status: "error",
                    message: "You don't have the permission to view this content"
                });
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json({
            status: "error",
            message: "You are unauthorized, login!"
        });
    }
}

module.exports = {
  generateToken,
  verifyToken,
};
