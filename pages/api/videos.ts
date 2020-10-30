import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { VideoRepository } from '../../backend/repositories/video_repository'
import { getUserFromCookie } from '../../backend/cookie_util'
import { VideoModel } from '../../frontend/logic/models/video_models'

const handler = nextConnect<NextApiRequest, NextApiResponse>()

// GET /api/videos
handler.get(async (_, res) => {
  const service = new VideoRepository()
  const videos = await service.getVideos()
  res.json(videos)
})

// POST /api/videos
// To add a video
handler.post(async (req, res) => {
  const user = getUserFromCookie(req) // <- TODO: Make user a strong type

  validateRequest(req.body, user)

  const videoId: string = req.body.videoId
  const newUrl = `https://www.youtube.com/embed/${videoId}`
  const imgUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`

  const videoModel: Omit<VideoModel, 'id'> = {
    videoId: newUrl,
    description: req.body.description,
    title: req.body.title,
    imgUrl: imgUrl,
  }
  const service = new VideoRepository()
  const videoObject = await service.saveVideo(videoModel)

  res.json(videoObject)
})

const validateRequest = (body: any, user: any) => {
  const videoId: string = body.videoId

  if (!user) {
    throw new Error('Not authenticated')
  } else if (!videoId) {
    throw new Error('Missing url in request')
  } else if (!body.description) {
    throw new Error('Missing description')
  } else if (!body.title) {
    throw new Error('Missing title, go fuck yourself.')
  }
}
export default handler
