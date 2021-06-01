import ApiEnum from './api-enum';
import { getAccessToken } from '@/api/getAccessToken';
import {
  http
} from '@/api/service';

class User {
  static async getAccessToken(data) {
    return getAccessToken(ApiEnum.accessToken, data);
  }

  static async getUserInfo() {
    return http.get(
      ApiEnum.userInfo
    );
  }
}

export default User;
