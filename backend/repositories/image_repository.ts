import { Bucket } from '@google-cloud/storage'
import * as firebase from 'firebase-admin'
import { ImageModel } from '../../frontend/logic/models/image_model'
import { createImageModel } from '../../frontend/logic/models/image_model'
import {
  verifyIdToken,
  initFirebase,
} from '../../frontend/utils/auth/firebaseAdmin'

export class ImageRepository {
  private db: FirebaseFirestore.Firestore
  private bucket: Bucket

  constructor() {
    initFirebase()
    this.db = firebase.firestore()
    this.bucket = firebase
      .storage()
      .bucket('gs://hotsaucevision-4d439.appspot.com')
  }

  async getImages(category?: string): Promise<ImageModel[] | undefined> {
    try {
      let docRef
      if (category) {
        docRef = await this.db
          .collection('images')
          .where('category', '==', category)
          .get()
      } else {
        docRef = await this.db.collection('images').get()
      }
      const imgArr: ImageModel[] = []
      docRef.forEach((doc) => {
        const rawData = doc.data()
        const imageModel = createImageModel(
          doc.id,
          rawData.url,
          rawData.category,
          rawData.description,
          rawData.author
        )
        imgArr.push(imageModel)
      })
      return imgArr
    } catch (error) {
      console.error(error)
    }
  }

  async createImage(
    file: Express.Multer.File,
    token: string,
    category: string,
    description: string,
    author: string
  ) {
    try {
      await verifyIdToken(token)

      // Save to bucket
      const result = await this.uploadImageToStorage(file)

      // Create firestore record
      if (!result) {
        throw new Error('Failed to upload to firebase')
      }

      // Save to firestore
      await this.db.collection('images').add({
        path: result.path,
        url: result.url,
        category: category,
        description: description,
        author: author,
      })
    } catch (error) {
      console.error({ error })
    }
  }

  async deleteImage(id: string, token: string) {
    await verifyIdToken(token)
    const documentRef = this.db.collection('images').doc(id)
    const documentSnapshot = await documentRef.get()
    const imageToBeDeleted = documentSnapshot.data()

    if (!imageToBeDeleted) {
      throw new Error('Image not found in database')
    }

    const fileName = imageToBeDeleted.path

    if (!fileName) {
      throw new Error('No filename found in database')
    }

    await documentRef.delete()

    //få en referanse til filen i storag

    await this.bucket.file(fileName).delete()

    /*
     * const image = this.bucket.file(path);
      await image.delete();
     */
  }

  private uploadImageToStorage = async (file: Express.Multer.File) => {
    if (!file) {
      throw new Error('No image file')
    }

    const supportedMimetypes = ['image/jpeg', 'image/png']

    if (!supportedMimetypes.includes(file.mimetype)) {
      console.warn('Wrong mimetype', file.mimetype)
      throw new Error('Wrong mimetype for image')
    }

    // file

    const imageFirebaseName = `images/${file.filename}`

    try {
      await this.bucket.upload(file.path, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        destination: imageFirebaseName,
        gzip: true,
        public: true,
        contentType: file.mimetype,
        metadata: {
          contentType: file.mimetype,
          cacheControl: 'public, max-age=31536000',
        },
      })
      const imageUrl = `https://storage.googleapis.com/${this.bucket.name}/${imageFirebaseName}`

      return {
        url: imageUrl,
        path: imageFirebaseName,
      }
    } catch (error) {
      console.error(error)
    }
  }
}
