import { HttpService } from '../../service/http.service';
import { BACKEND_KEYS } from '../../common/consts/app-keys.const';
import { IUser } from '../types/user.type';

class UserService extends HttpService {
  registerUser(body: IUser): Promise<{ email: string }> {
    return this.post(
      {
        url: BACKEND_KEYS.REGISTER
      },
      body
    );
  }

  loginUser(body: IUser): Promise<{ id: string; token: { token: string } }> {
    return this.post(
      {
        url: BACKEND_KEYS.LOGIN
      },
      body
    );
  }

  updatePassword(body: { email: string; oldPassword: string; newPassword: string }) {
    return this.put(
      {
        url: BACKEND_KEYS.PASSWORD
      },
      body
    );
  }

  logoutUser(id: string) {
    return this.get({
      url: `${BACKEND_KEYS.LOGOUT}/${id}`
    });
  }
}

export const userService = new UserService();
