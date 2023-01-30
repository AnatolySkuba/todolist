import gravatar from 'gravatar';
import bCrypt from 'bcryptjs';
import User, { IUser, IUserProfile } from '../models/User';
import { RequestErrorUtil } from '../utils/request-error.util';
import { generateJwt } from '../utils/generate-jwt.util';

export default class UserService {
  async registerUser(body: IUser) {
    const { email, password } = body;
    const user: IUser | null = await User.findOne({ email });
    if (user) {
      throw RequestErrorUtil(409, 'Email in use');
    }
    const hashPassword = await bCrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    await User.create({
      email,
      password: hashPassword,
      avatar: avatarURL
    });

    return {
      email
    };
  }

  async loginUser(body: IUser): Promise<{
    id: any;
    token: {
      token: string;
    };
  }> {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      throw RequestErrorUtil(401, 'Email not found');
    }
    const comparePassword = await bCrypt.compare(password, user.password);
    if (!comparePassword) {
      throw RequestErrorUtil(401, 'Password wrong');
    }
    const payload = { id: user._id };
    const token = generateJwt(payload);
    await User.findByIdAndUpdate(user._id, token);

    return {
      id: user._id,
      token
    };
  }

  async profileUser(body: IUserProfile): Promise<void> {
    const { email, oldPassword, newPassword } = body;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      throw RequestErrorUtil(400, 'Incorrect email');
    }
    const valid = await bCrypt.compare(oldPassword, user.password);
    if (!valid) {
      throw RequestErrorUtil(401, 'Incorrect password');
    }
    const hashedPass = await user.setPassword(newPassword);
    await User.findOneAndUpdate(
      { email },
      { password: hashedPass },
      {
        new: true
      }
    );
  }

  async logoutUser(_id: string): Promise<void> {
    await User.findByIdAndUpdate(_id, { token: '' });
  }
}

export const userService = new UserService();
