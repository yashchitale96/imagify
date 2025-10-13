import jwt from "jsonwebtoken";
import "dotenv/config";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Not Authorized. Login Again" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login again",
      });
    }

    // Create user object if it doesn't exist
    if (!req.user) {
      req.user = {};
    }
    
    // Store userId in req.user instead of req.body
    req.user.id = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid token" 
    });
  }
};

export default userAuth;