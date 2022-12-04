import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class TopicProposalApi {
  static async listAllTopicsByLecturer (token) {
    const res = await axios.get('/topic-proposal/lecturer', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listAllTopicsByCreated (token) {
    const res = await axios.get('/topic-proposal/created', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async addTopicProposal (token, value) {
    const res = await axios.post('/topic-proposal/', value, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateTopicProposal (token, value) {
    const res = await axios.put(`/topic-proposal/${value._id}`, value, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async removeTopicProposal (token, id) {
    const res = await axios.delete(`/topic-proposal/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async approveTopicProposalByLecturer (token, id) {
    console.log(token);
    const res = await axios.post(`/approve/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
