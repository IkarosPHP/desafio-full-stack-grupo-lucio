import { admin } from '../config/firebase.config'

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export { admin };
