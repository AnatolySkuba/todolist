import { Document, model, Schema } from 'mongoose';
import Joi from 'joi';
import bCrypt from 'bcryptjs';

// TODO: Use it as an example
/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends Document {
  email: string;
  password: string;
  avatar: string;
  token?: string;
  setPassword: (password: string) => Promise<string>;
}

export interface IUserProfile {
  email: string;
  oldPassword: string;
  newPassword: string;
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  token: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.setPassword = async function setPassword(password: string) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10));
  return this.password;
};

export const userSchemaJoi = Joi.object<IUser>({
  email: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string(),
  token: Joi.string()
});

const User = model<IUser>('User', userSchema);

export default User;
