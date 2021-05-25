import http from '../CloudinaryAPI';

const uploadOrUpdateImage = (file) => {
  const formData = new FormData();
  formData.append('file', file[0]);
  formData.append('upload_preset', 'xjrgcel9');

  return http.post('/image/upload/', formData);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  uploadOrUpdateImage,
};
