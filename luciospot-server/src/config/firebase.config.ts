import * as admin from 'firebase-admin';
import serviceAccount from './secret.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export { admin };
