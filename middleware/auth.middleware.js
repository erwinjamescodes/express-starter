import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token && !token.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const userToken = token.split(" ")[1];

    try {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      req.user = decoded;
      next();
    } catch (jwtError) {
      return res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export default authMiddleware;
