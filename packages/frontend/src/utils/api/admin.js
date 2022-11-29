import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class AdminApi {
  static async listAllAdmin (token) {
    const res = await axios.get('/user?type=ADMIN', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async addAdmin (token, value) {
    const {
      email, code, name, gender,
    } = value;
    const res = await axios.post('/user', {
      type: 'ADMIN',
      email,
      code,
      name,
      gender,
      picture: null,

    }, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateAdmin (token, value) {
    const {
      email, code, name, gender,
    } = value;
    const res = await axios.put(`/user/${code}`, {
      type: 'ADMIN',
      email,
      code,
      name,
      gender,
      picture: null,
    }, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async importAdmin (token, xlsx) {
    const formData = new FormData();

    formData.append('xlsx', xlsx);
    formData.append('type', 'ADMIN');
    const res = await axios.post(
      '/user-import',
      formData,
      {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  }
}
