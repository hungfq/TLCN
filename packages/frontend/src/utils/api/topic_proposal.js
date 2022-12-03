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
    console.log('🚀 ~ file: topic_proposal.js:17 ~ TopicProposalApi ~ addTopicProposal ~ static', value);
    const res = await axios.post('/topic-proposal', value, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  }
}
