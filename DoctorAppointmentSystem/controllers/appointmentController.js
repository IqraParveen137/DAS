import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
//create
export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, amount, slotDate, slotTime } = req.body;
    if (!userId || !doctorId || !amount || !slotDate || !slotTime) {
      return res.status(400).send({
        success: false,
        message: 'please provide all fields',
      });
    }
    const appointment = new appointmentModel({
      userId,
      doctorId,
      amount,
      slotDate,
      slotTime,
    });
    await appointment.save();
    res.status(201).send({
      success: true,
      message: 'Appointment book successfully',
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in creating appointment api',
      error,
    });
  }
};
//get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({});
    res.status(200).send({
      success: true,
      message: 'All Appointments',
      totalCount: appointment.length,
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting all appointments',
      error,
    });
  }
};
//get doctor appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await appointmentModel
      .find({
        doctorId: id,
      })
      .populate('userId');

    res.status(200).send({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error getting doctor appointments',
      error,
    });
  }
};
//get details
export const getAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please provide appointment id',
      });
    }
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: 'No appointment found with this id',
      });
    }
    //find user&doctor
    const user = await userModel.findOne({ _id: appointment?.userId });
    const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });
    res.status(200).send({
      success: true,
      message: 'Appointmen details fetched successfully',
      appointmentDetails: {
        clientName: user?.name,
        clientPhone: user?.phone,
        clientEmail: user?.email,
        doctorName: doctor?.name,
        doctorPhone: doctor?.phone,
        doctorEmail: doctor?.email,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        amount: appointment?.amount,
        status: appointment?.status,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting appointment details',
      error,
    });
  }
};
//change Status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please provide appointment id',
      });
    }
    const { appointmentStatus } = req.body;
    if (!appointmentStatus) {
      return res.status(404).send({
        success: false,
        message: 'Please provide appointment status',
      });
    }
    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { $set: { status: appointmentStatus } },
      { returnOriginal: false },
    );
    res.status(200).send({
      success: true,
      message: 'status has been updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in update appointment status',
      error,
    });
  }
};
//User Appointments
export const getUserAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please provide appointment id',
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'user not found',
      });
    }
    const appointment = await appointmentModel.find({ userId: user._id });
    res.status(200).send({
      success: true,
      message: 'Your Appointments',
      totalCount: appointment.length,
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting user appointments',
      error,
    });
  }
};
// GET USER APPOINTMENT DETAILS
export const getUserAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please provide appointment id',
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'No user found with this id',
      });
    }
    //find user&doctor
    const appointment = await appointmentModel.findOne({
      userId: user?._id,
    });
    const doctor = await doctorModel.findOne({
      _id: appointment?.doctorId,
    });
    res.status(200).send({
      success: true,
      message: 'Appointmen details fetched successfully',
      appointmentDetails: {
        doctorName: doctor?.name,
        doctorPhone: doctor?.phone,
        doctorEmail: doctor?.email,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting USER appointment details',
      error,
    });
  }
};
//update user booking status
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'Please provide appointment id',
      });
    }
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: 'No appointment found with this id',
      });
    }
    await appointment.updateOne({ $set: { status: 'cancel' } });
    res.status(200).send({
      success: true,
      message: 'Appointment canceled successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in canceling USER appointment',
      error,
    });
  }
};
