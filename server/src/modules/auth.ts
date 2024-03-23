import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
  // salt is 5, what salt is for?
  // salt is a random string that is added to the password before hashing it
  // this makes it harder for attackers to guess the password
  // the higher the number, the longer it takes to hash the password
  return bcrypt.hash(password, 5);
}

export const createJWT = (user) => {
  // how jwt.sign works?
  // jwt.sign(payload, secret, options)
  // payload is the data that you want to encode
  // secret is the key that is used to encode the data

  const token = jwt.sign({
    id: user.id,
    userename: user.username
  },
    process.env.JWT_SECRET,);

  return token;
}


export const protect = (req, res, next) => {
  // what is bearer?
  // bearer is a token that is used to authenticate the user
  // it is added to the request headers
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401)
    res.json({ message: "Not authorized" })
    return
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401)
    res.json({ message: "Not valid token" })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.status(401)
    res.json({ message: "Not valid token from catch" })
    return
  }
}