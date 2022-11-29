import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class StudentApi {
  static async listAllStudent (token) {
    const res = await axios.get('/user?type=STUDENT', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async addStudent (token, value) {
    const {
      email, code, name, gender,
    } = value;
    const res = await axios.post('/user', {
      type: 'STUDENT',
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

  static async updateStudent (token, value) {
    const {
      email, code, name, gender,
    } = value;
    const res = await axios.put(`/user/${code}`, {
      type: 'STUDENT',
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

  static async importStudent (token, xlsx) {
    const formData = new FormData();

    formData.append('xlsx', xlsx);
    formData.append('type', 'STUDENT');
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
