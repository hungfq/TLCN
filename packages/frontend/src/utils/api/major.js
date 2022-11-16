import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class MajorApi {
  static async listAllMajor(token) {
    const res = await axios.get('/majors', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
