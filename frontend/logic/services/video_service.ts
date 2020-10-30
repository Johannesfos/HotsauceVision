import axios from 'axios'
import { Constants } from '../../../shared/constants'
import { VideoModel } from '../models/video_models'

export default class VideoService {
  static getVideos = async () => {
    // get videos from api
    const url = `${Constants.BASE_URL}/api/videos`
    try {
      const response = await axios.get<VideoModel[]>(url)
      const videos = response.data

      return videos
    } catch (error) {
      console.warn('Failed to fetch videos from api', error.response.status)
      return []
    }
  }

  static async deleteVideo(id: string) {
    const url = `${Constants.BASE_URL}/api/videos/${id}`

    try {
      await axios.delete(url)
    } catch (error) {
      console.error(error)
    }
  }

  static uploadVideo = async (
    videoModel: Omit<VideoModel, 'id' | 'imgUrl'>
  ) => {
    // upload video thorugh api
    try {
      console.log(videoModel)
      const url = `${Constants.BASE_URL}/api/videos`
      const response = await axios.post<VideoModel>(url, videoModel)
      console.log(response.status)
      return true
    } catch (error) {
      return false
    }
  }
}
