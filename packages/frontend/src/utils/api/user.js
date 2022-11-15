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

  static async getAllUser (token) {
    const res = await axios.get('/user', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async getUserById (token, id) {
    const res = await axios.get(`/user/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateUserById (token, id, sex, name, email, code) {
    const res = await axios.put(`/user/${id}`, {
      sex, name, email, code,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
}
