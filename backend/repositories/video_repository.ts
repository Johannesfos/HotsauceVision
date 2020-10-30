import * as firebase from 'firebase-admin'
import {
  initFirebase,
  verifyIdToken,
} from '../../frontend/utils/auth/firebaseAdmin'
import { VideoModel } from '../../frontend/logic/models/video_models'

export class VideoRepository {
  private db: FirebaseFirestore.Firestore
  private videoCollection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor() {
    initFirebase()
    this.db = firebase.firestore()
    this.videoCollection = this.db.collection('videos')
  }

  getVideos = async () => {
    //hente videos
    const docRef = await this.videoCollection.get()
    try {
      const videoArr: VideoModel[] = []
      docRef.forEach((doc) => {
        const rawData = doc.data()

        const videoModel: VideoModel = {
          id: doc.id,
          description: rawData.description,
          title: rawData.title,
          videoId: rawData.videoId,
          imgUrl: rawData.imgUrl,
        }
        videoArr.push(videoModel)
      })
      return videoArr
    } catch (error) {
      throw error
    }
  }
  async deleteVideo(id: string, token: string) {
    await verifyIdToken(token)
    const documentRef = this.db.collection('videos').doc(id)
    const documentSnapshot = await documentRef.get()
    const videoToBeDeleted = documentSnapshot.data()

    if (!videoToBeDeleted) {
      throw new Error('Video not found in database')
    }

    await documentRef.delete()
    console.log('Video with ' + id + ' deleted')
  }

  saveVideo = async (videoModel: Omit<VideoModel, 'id'>) => {
    try {
      console.log(videoModel)
      const docRef = await this.videoCollection.add(videoModel)
      const newVideo = await this.videoCollection.doc(docRef.id).get()
      return newVideo.data() as VideoModel
    } catch (error) {
      throw error
    }
  }
}
