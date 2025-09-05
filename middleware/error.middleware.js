const errorMiddleware = (err, req, res, next) => {
  try {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid ID" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token expired" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export default errorMiddleware;
