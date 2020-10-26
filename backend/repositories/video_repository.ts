import * as firebase from 'firebase-admin'
import { initFirebase } from '../../frontend/utils/auth/firebaseAdmin'
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
          url: rawData.url,
        }
        videoArr.push(videoModel)
      })
      return videoArr
    } catch (error) {
      throw error
    }
  }

  saveVideo = async (videoModel: Omit<VideoModel, 'id'>) => {
    try {
      const docRef = await this.videoCollection.add(videoModel)
      const newVideo = await this.videoCollection.doc(docRef.id).get()
      return newVideo.data() as VideoModel
    } catch (error) {
      throw error
    }
  }
}
