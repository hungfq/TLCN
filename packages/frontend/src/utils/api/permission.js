import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class PermissionApi {
  static async getAllPermissions (token) {
    const res = await axios.get('/permission', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
