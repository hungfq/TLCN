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
}
