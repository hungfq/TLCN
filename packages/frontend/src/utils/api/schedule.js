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

  static async listScheduleToday (token) {
    const res = await axios.get('/schedule/today', {
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

  static async lecturerListScheduleTopic (token) {
    const res = await axios.get('/schedule-topic-lecturer', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async lecturerListScheduleTopicShort (token) {
    const res = await axios.get('/schedule-topic-lecturer/short', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async importTopic (token, id, xlsx) {
    const formData = new FormData();

    formData.append('xlsx', xlsx);
    const res = await axios.post(
      `/schedule/${id}/topic`,
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

  static async importStudent (token, id, xlsx) {
    const formData = new FormData();

    formData.append('xlsx', xlsx);
    const res = await axios.post(
      `/schedule/${id}/student`,
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

  static s2ab (s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  static async exportExcel (token, id) {
    const res = await axios.get(
      `/schedule/${id}/export`,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      },
    ).then((response) => {
      const blob = new Blob([response.data], {
        type: 'application/xml',
      });

      // href = URL.createObjectURL(blob);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ScheduleReport.xlsx');
      document.body.appendChild(link);
      link.click();
    });
    return res;
  }
}
