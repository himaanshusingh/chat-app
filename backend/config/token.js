import jwt from "jsonwebtoken";

const genarateToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("gen token error");
  }
};

export default genarateToken;
