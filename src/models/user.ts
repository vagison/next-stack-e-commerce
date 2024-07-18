import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from '../interfaces/models/user';

// Define the Mongoose schema
const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Define the Mongoose model
const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel };
