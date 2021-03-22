import http from '../CloudinaryAPI'

const uploadOrUpdateImage = (file: any) => {

  const formData = new FormData()
  formData.append('file', file[0])
  formData.append('upload_preset', 'xjrgcel9')

  return http.post('/image/upload/', formData)
}

export default {
  uploadOrUpdateImage
}
