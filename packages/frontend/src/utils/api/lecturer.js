import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class LectureApi {
  static async listAllLecturer (token) {
    const res = await axios.get('/user?type=LECTURER', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async addLecturer (token, value) {
    const {
      email, code, name, gender,
    } = value;
    const res = await axios.post('/user', {
      type: 'LECTURER',
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

  static async updateLecturer (token, value) {
    const {
      email, code, name, gender,
    } = value;
    const res = await axios.put(`/user/${code}`, {
      type: 'LECTURER',
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

  static async importLecturer (token, xlsx) {
    const formData = new FormData();

    formData.append('xlsx', xlsx);
    formData.append('type', 'LECTURER');
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
