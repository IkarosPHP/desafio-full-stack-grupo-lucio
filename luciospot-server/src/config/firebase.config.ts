import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
