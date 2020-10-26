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

  const url: string = req.body.url
  const newUrl = url.replace('watch?v=', 'embed/')

  const videoModel: Omit<VideoModel, 'id'> = {
    url: newUrl,
    description: req.body.description,
    title: req.body.title,
  }
  const service = new VideoRepository()
  const videoObject = await service.saveVideo(videoModel)

  res.json(videoObject)
})

const validateRequest = (body: any, user: any) => {
  const url: string = body.url

  if (!user) {
    throw new Error('Not authenticated')
  } else if (!body.url) {
    throw new Error('Missing url in request')
  } else if (!url.includes('youtube')) {
    throw new Error('Has to be Youtube-Link')
  } else if (!body.description) {
    throw new Error('Missing description')
  } else if (!body.title) {
    throw new Error('Missing title, go fuck yourself.')
  }
}
export default handler
