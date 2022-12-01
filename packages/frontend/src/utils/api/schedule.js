import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class ScheduleApi {
  static async listAllSchedule (token) {
    const res = await axios.get('/schedule', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async addSchedule (token, value) {
    const res = await axios.post('/schedule', value, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateSchedule (token, value) {
    const res = await axios.put(`/schedule/${value._id}`, value, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async removeSchedule (token, id) {
    const res = await axios.delete(`/schedule/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
