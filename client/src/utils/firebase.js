import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import ENV from '../utils/config'

const app = initializeApp({
    apiKey: ENV.VITE_APP_FIREBASE_API_KEY,
    authDomain: ENV.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: ENV.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: ENV.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.VITE_APP_FIREBASE_APP_ID
})

export const auth = getAuth(app)
export const db = getFirestore(app)