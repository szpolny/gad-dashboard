import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

const User = models.User || mongoose.model('User', userSchema);
export default User;
