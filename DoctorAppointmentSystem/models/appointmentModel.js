import mongoose from 'mongoose';
const AppointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'user',
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'doctor',
    },
    slotDate: { type: String, require: true },
    slotTime: { type: String, require: true },
    amount: { type: String, require: true },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed', 'canceled'],
    },
    payment: { type: Boolean, default: false },
  },

  { timestamps: true },
);
const appointmentModel = mongoose.model('appointment', AppointmentSchema);
export default appointmentModel;
