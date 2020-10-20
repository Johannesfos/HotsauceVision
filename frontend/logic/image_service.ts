import { ImageModel } from './image_model'
import axios from 'axios'
import { Constants } from '../../shared/constants'

export class ImageService {
  static async uploadImage(
    imgFile: File,
    category: string,
    description: string
  ) {
    try {
      const formData = new FormData()
      formData.append('image', imgFile)
      formData.append('category', category)
      formData.append('description', description)

      const response = await axios.post<ImageModel>('/api/pictures', formData)

      const addedImage = response.data
      return addedImage
    } catch (error) {
      return 'failed'
    }
  }

  static async deleteImage(id: string) {
    try {
      await axios.delete(`${Constants.BASE_URL}/api/pictures/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  static async getAllImages(): Promise<ImageModel[]> {
    const url = `${Constants.BASE_URL}/api/pictures`
    console.log(url)
    try {
      const response = await axios.get(url)
      const images = response.data
      return images
    } catch (error) {
      console.warn('Failed to fetch images from api', error.response.status)
      return []
    }
  }

  static async getImageByCategory(category: string) {
    const url = `${Constants.BASE_URL}/api/pictures?category=${category}`
    try {
      const response = await axios.get(url)
      const images = response.data
      return images
    } catch (error) {
      console.warn('Failed to fetch images from api', error.response.status)
      return []
    }
  }
}
