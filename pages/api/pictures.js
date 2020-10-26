import multer from 'multer'
import nextConnect from 'next-connect'
import { getUserFromCookie } from '../../backend/cookie_util'
import { ImageRepository } from '../../backend/repositories/image_repository'

// Request til [POST/GET/PATCH] /api/picture

const handler = nextConnect()
const upload = multer({ dest: '/tmp' })

/* middleware
function mustBe18Middleware(req, res, next) {
  if (req.header.quasi !== "flutitiitit") {
    throw Error("Headers must include quasi")
  }
  next();
}
*/

// GET /api/pictures(?category=bla) (legge til at vi kan sende query paramtere)
handler.get(async (req, res) => {
  const category = req.query.category
  const service = new ImageRepository()
  const images = await service.getImages(category)
  res.json(images)
})

// POST /api/pictures
// To add a image
handler.post(upload.single('image'), async (req, res) => {
  const user = getUserFromCookie(req)

  const image = req.file
  const token = user.token
  const description = req.body.description
  const category = req.body.category

  if (!token) {
    throw new Error('No auth token')
  } else if (!image) {
    throw new Error('No image')
  } else if (!description) {
    throw new Error('No desc')
  } else if (!category) {
    throw new Error('Missing category')
  }

  const service = new FirebaseImageService()
  await service.createImage(image, token, category, description)
  res.json({})
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler

// npm install uuid-v4
