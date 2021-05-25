import Axios from 'axios';

const cloud_name = 'novve';
const URL = `https://api.Cloudinary.com/v1_1/${cloud_name}`;

export const CloudinaryAPI = Axios.create({
  baseURL: URL,
});

export default CloudinaryAPI;
