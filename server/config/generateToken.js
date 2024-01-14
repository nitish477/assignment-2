import jwt from "jsonwebtoken";

const generateToken = (UserId) => {
  return jwt.sign({ UserId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generateToken;
