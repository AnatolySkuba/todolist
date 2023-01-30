import { Request } from 'express';
import { IUser, IUserProfile } from '../models/User';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request<{ body: IUser }>) {
    const { email } = await this.userService.registerUser(req.body);

    return { email };
  }

  async loginUser(req: Request<{ body: IUser }>) {
    const { id, token } = await this.userService.loginUser(req.body);

    return { id, token };
  }

  async profileUser(req: Request<{ body: IUserProfile }>) {
    const { email } = req.body;
    await this.userService.profileUser(req.body);

    return {
      message: `Updating user profile was successful: ${email}`
    };
  }

  async logoutUser(req: Request<{ id: string }>) {
    await this.userService.logoutUser(req.params.id);

    return {
      message: 'Logout user profile was successful'
    };
  }
}

export const userController = new UserController(new UserService());
