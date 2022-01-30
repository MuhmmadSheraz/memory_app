import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
export interface User extends Document {
  name: string;
  profilePicture: string;
  email: string;
  password: string;
  confirmPassword: string;
  correctPassword: (candidatePassword: string, userPassword: string) => boolean;
}
const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: validator.isEmail
  },
  profilePicture: {
    type: String,
    required: [true, 'profilePicture is required']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 6,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirmPassword is required'],
    minlength: 6,
    select: false
  },
  passwordResetToken: String,
  expiryOfPasswordResetToken: Date
});

// Methods are some custom helper function
//  We are using methods because of (FAT Model and THIN Controller philosophy)

// Method for create resetPasswordtoken


// Method for authenticate password
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Middleware for password confirmation
userSchema.pre('validate', function (next) {
  if (this.confirmPassword && this.password !== this.confirmPassword) {
    this.invalidate('passwordConfirmation', 'enter the same password');
  }
  next();
});

// Password hashing using middleware
userSchema.pre('save', async function (next) {
  // do not has hashed the password if it's not modified or newly created
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex'); // generating token
  const hasedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex'); 
  this.passwordResetToken = hasedToken; // will save hashed token in db for security purpose
  this.expiryOfPasswordResetToken = Date.now() + 10 * 60 * 1000; // 10 mins
  return resetToken;
};

export const userModal = mongoose.model<User & mongoose.Document>(
  'users',
  userSchema
);
