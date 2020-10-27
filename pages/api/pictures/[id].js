import nextConnect from 'next-connect'
import { getUserFromCookie } from '../../../backend/cookie_util'
import { ImageRepository } from '../../../backend/repositories/image_repository'

// Alle request som kommer til /api/pictures/:id

const handler = nextConnect()

// GET /api/pictures/:id
handler.get(async (req, res) => {
  res.json({})
})

// DELETE /api/pictures/:id
handler.delete(async (req, res) => {
  //const user = JSON.parse(req.headers.cookie)
  //få en referanse til database
  try {
    const user = getUserFromCookie(req)
    console.log('images is being deleted')
    const service = new ImageRepository()
    await service.deleteImage(req.query.id, user.token)

    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
})

export default handler
