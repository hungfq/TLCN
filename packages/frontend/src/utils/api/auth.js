import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export const signInWithGoogle = ({
  email, name, picture, hd,
}) => axios({
  method: 'POST',
  url: 'auth',
  data: {
    email, name, picture, hd,
  },
});
export default signInWithGoogle;
