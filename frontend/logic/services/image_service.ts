import axios from 'axios'
import { Constants } from '../../../shared/constants'
import { ImageModel } from '../models/image_model'

export class ImageService {
  static async uploadImage(
    imgFile: File,
    category: string,
    description: string,
    author: string
  ) {
    try {
      const formData = new FormData()
      formData.append('image', imgFile)
      formData.append('category', category)
      formData.append('description', description)
      formData.append('author', author)

      await axios.post<ImageModel>(
        `${Constants.BASE_URL}/api/pictures`,
        formData
      )

      return true
    } catch (error) {
      return false
    }
  }

  static async deleteImage(id: string) {
    const url = `${Constants.BASE_URL}/api/pictures/${id}`

    try {
      await axios.delete(url)
    } catch (error) {
      console.error(error)
    }
  }

  static async getAllImages(): Promise<ImageModel[]> {
    const url = `${Constants.BASE_URL}/api/pictures`
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
