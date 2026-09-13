import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'please provide all fields',
      });
    }
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = { name, email, password: hashedPassword };
    //save user
    const newUser = new userModel(userData);
    const user = await newUser.save();
    res.status(201).send({
      success: true,
      message: 'signup successfuly',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};
//LOGIN
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'please add email or password',
      });
    }
    //find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'user not found',
      });
    }
    //match password
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(402).send({
        success: false,
        message: 'invalid credentials',
      });
    }
    //token
    const token = JWT.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: '365d',
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: 'login successfully',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};
// update user details
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'User id Not Found',
      });
    }
    const { name, phone, dob, image, gender, address } = req.body;
    const photoToBase64 = req.file && req.file.buffer.toString('base64');
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { name, dob, address, phone, gender, image: photoToBase64 },
      },
      { returnOriginal: false },
    );
    res.status(200).send({
      success: true,
      message: 'Profile Updated Successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong in update user api',
      error,
    });
  }
};
//password reset
export const updatePassword = async (req, res) => {
  try {
    //user id
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'user id not found',
      });
    }
    //req.body
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: 'please provide oldPassword and newPassword',
      });
    }
    //find user
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(402).send({
        success: false,
        message: 'user not found',
      });
    }
    //check old password
    console.log('old:', oldPassword.length);
    console.log('hash:', user.password);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'incorrect old password',
      });
    }
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //update
    console.log(user.email);
    console.log(user.password);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong in update password api',
      error,
    });
  }
};
//GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: 'All Users',
      totalCount: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong in getting all users',
      error,
    });
  }
};
//GET USER DETAILS & APPOINTMENT DETAILS
export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'please provide user id',
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'No user found with this id',
      });
    }
    //find appointments
    const appointments = await appointmentModel.find({ userId: user?._id });
    res.status(200).send({
      success: true,
      message: 'Details Fetched Successfully',
      user,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong in getting all users',
      error,
    });
  }
};
//GET STATS
export const getStats = async (req, res) => {
  try {
    const users = await userModel.find({});
    const doctors = await doctorModel.find({});
    const appointments = await appointmentModel.aggregate([
      {
        $group: { _id: null, totalEarning: { $sum: { $toDouble: '$amount' } } },
      },
    ]);
    const total = appointments.length > 0 ? appointments[0].totalEarning : 0;
    res.status(200).send({
      success: true,
      message: 'All Stats',
      stats: {
        totalUsers: users.length,
        totalDoctors: doctors.length,
        earning: total,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong in getting all Stats',
      error,
    });
  }
};
//GET LOGIN USERS
export const getLoginUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide User id',
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'No User found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Login User Detail',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong in getting all users',
      error,
    });
  }
};
