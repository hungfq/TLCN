import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class UserApi {
  static async getUserInfo (token) {
    const res = await axios.get('/profile', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async editProfile (token, name, code, sex) {
    const res = await axios.post('/profile', {
      name, code, sex,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
}
