import jwt from "jsonwebtoken";

const createJWT = (id: number): string => {
  return jwt.sign(
    {
      id
    },
    process.env.JWT_TOKEN || ""
  );
};

export default createJWT;
