import * as firebase from 'firebase-admin'

export const initFirebase = () => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY
  if (!firebasePrivateKey) {
    throw new Error("Can't read firebase private key")
  }

  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }
}

export const verifyIdToken = (token: string) => {
  if (!firebase.apps.length) {
    initFirebase()
  }

  return firebase
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}
