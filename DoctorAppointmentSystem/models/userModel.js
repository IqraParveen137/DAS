import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain uppercase, lowercase, number and special character',
      ],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    },
    image: { type: String },
    phone: {
      type: String,
      trim: true,
      match: [/^03\d{9}$/, 'Please enter a valid Pakistani phone number'],
    },
    dob: { type: String },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const userModel = mongoose.model('user', userSchema);
export default userModel;
