import nextConnect from 'next-connect'
import { getUserFromCookie } from '../../../backend/cookie_util'
import { VideoRepository } from '../../../backend/repositories/video_repository'

// Alle request som kommer til /api/pictures/:id

const handler = nextConnect()

// DELETE /api/pictures/:id
handler.delete(async (req, res) => {
  //const user = JSON.parse(req.headers.cookie)
  //få en referanse til database
  try {
    const user = getUserFromCookie(req)
    const service = new VideoRepository()
    await service.deleteVideo(req.query.id, user.token)

    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
})

export default handler
