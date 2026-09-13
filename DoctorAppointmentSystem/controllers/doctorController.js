import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
//doctor login
export const doctorLogin = async (req, res) => {
  try {
    console.log('Doctor login API called');
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: 'Doctor not found',
      });
    }

    const match = await bcrypt.compare(password, doctor.password);
    console.log('Entered Password:', password);
    console.log('Match:', match);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: 'Invalid password',
      });
    }

    const token = JWT.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    doctor.password = undefined;

    res.status(200).send({
      success: true,
      message: 'Doctor login successfully',

      token,

      doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Doctor login error',
      error,
    });
  }
};
//doctor signup
export const doctorSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file;
    const photoToBase64 = req.file && req.file.buffer.toString('base64');
    if (!name || !email || !password) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          success: false,
          message:
            'Password must be at least 8 characters and contain a letter, number and special character',
        });
      }
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    const existDoctor = await doctorModel.findOne({ email });

    if (existDoctor) {
      return res.status(400).send({
        success: false,
        message: 'Doctor already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = await new doctorModel({
      ...req.body,
      password: hashedPassword,
      image: photoToBase64,
    }).save();

    res.status(201).send({
      success: true,
      message: 'Doctor signup successfully',
      doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Doctor signup error',
      error,
    });
  }
};
//add doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      degree,
      fees,
      gender,
      phone,
      address,
      speciality,
      experience,
      dob,
    } = req.body;
    const image = req.file;
    if (
      !name ||
      !email ||
      !password ||
      !degree ||
      !fees ||
      !gender ||
      !phone ||
      !address ||
      !image ||
      !speciality ||
      !experience ||
      !dob
    ) {
      return res.status(500).send({
        success: false,
        message: 'please provide all fields',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const photoToBase64 = req.file && req.file.buffer.toString('base64');
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      degree,
      fees,
      gender,
      phone,
      address,
      image: photoToBase64,
      speciality,
      experience,
      dob,
    };
    const doctor = new doctorModel(doctorData);
    await doctor.save();
    res.status(201).send({
      success: true,
      message: 'Doctor created successfully',
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in add doctor api',
      error,
    });
  }
};
//get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: 'All doctors list',
      totalCount: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting all doctors api',
      error,
    });
  }
};
//GET LOGIN DOCTOR
export const getLoginDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Doctor id not found',
      });
    }

    const doctor = await doctorModel.findById(id);

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: 'Doctor not found',
      });
    }

    doctor.password = undefined;

    res.status(200).send({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error getting login doctor',
      error,
    });
  }
};
import appointmentModel from '../models/appointmentModel.js';

// Doctor Dashboard Stats
export const getDoctorStats = async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await appointmentModel.find({ doctorId: id });

    const totalAppointments = appointments.length;

    const pending = appointments.filter(
      (item) => item.status === 'pending',
    ).length;

    const completed = appointments.filter(
      (item) => item.status === 'completed',
    ).length;

    const canceled = appointments.filter(
      (item) => item.status === 'canceled',
    ).length;

    res.status(200).send({
      success: true,
      stats: {
        totalAppointments,
        pending,
        completed,
        canceled,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: 'Error in doctor stats',
      error: error.message,
    });
  }
};
//Update Password
export const updateDoctorPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const doctor = await doctorModel.findById(id);

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: 'Doctor not found',
      });
    }

    // compare old password
    const match = await bcrypt.compare(oldPassword, doctor.password);

    if (!match) {
      return res.status(400).send({
        success: false,
        message: 'Old password incorrect',
      });
    }

    doctor.password = await bcrypt.hash(newPassword, 10);
    await doctor.save();
    const updatedDoctor = await doctorModel.findById(id);

    const check = await bcrypt.compare(newPassword, updatedDoctor.password);

    console.log('New Password Saved:', check);

    res.status(200).send({
      success: true,
      message: 'Password updated',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
//get doc details
export const getDoctorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please add doctor id',
      });
    }
    //find user
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(402).send({
        success: false,
        message: 'doctor not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Details Fetched Seccussfully',
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting doctor details',
      error,
    });
  }
};
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please add doctor id',
      });
    }

    const data = req.body;

    // Agar image upload hui hai to base64 me convert karo
    if (req.file) {
      data.image = req.file.buffer.toString('base64');
    }

    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }, // returnOriginal ki jagah new use karo
    );

    res.status(200).send({
      success: true,
      message: 'Details updated successfully',
      doctor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: 'Error in updating doctor details',
      error,
    });
  }
};
//Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please add doctor id',
      });
    }
    const doctor = await doctorModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Deleted Seccussfully',
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting doctor details',
      error,
    });
  }
};
//Update available status
export const updateAvailableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please add doctor id',
      });
    }
    const { available } = req.body;
    if (available === undefined) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide available status',
      });
    }
    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: { available } },
      { returnDocument: 'after' },
    );
    res.status(200).send({
      success: true,
      message: 'Doctor Available Status Updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in updating doctor available',
      error,
    });
  }
};
