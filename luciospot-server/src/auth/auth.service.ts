import { Injectable, UnauthorizedException } from '@nestjs/common';
import fetch from 'node-fetch';
import { admin } from 'src/config/firebase.config';

@Injectable()
export class AuthService {
  private readonly firebaseApiKey = process.env.FIREBASE_API_KEY;
  private readonly firestore = admin.firestore();

  async login(email: string, password: string): Promise<{ idToken: string, isAdmin: boolean }> {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    const usuarioSnapshot = await this.firestore
      .collection('usuarios')
      .where('uid', '==', data.localId)
      .get();
    const usuarioData = usuarioSnapshot.docs[0].data();
    return { idToken: data.idToken, isAdmin: usuarioData.isAdmin};
  }

  async registerUser(email: string, password: string, displayName?: string) {
    try {
      const user = {
        email: email,
        password: password,
        displayName: displayName,
      }
      const userRecord = await admin.auth().createUser(user);
      await this.firestore.collection('usuarios').add({email, displayName, uid: userRecord.uid, isAdmin: false});
      return userRecord;
    } catch (error) {
      console.error('Error creating new user:', error);
      throw error;
    }
  }
}

