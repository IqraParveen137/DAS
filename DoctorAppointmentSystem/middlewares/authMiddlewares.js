import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// user auth
export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: 'Not Authorized User',
      });
    }

    console.log('Authorization Header:', authHeader);

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    console.log('Token:', token);

    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).send({
      success: false,
      message: 'Error in User Auth',
      error,
    });
  }
};

// admin auth
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user.isAdmin) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access',
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(401).send({
      success: false,
      message: 'Error in Admin Auth',
      error,
    });
  }
};
