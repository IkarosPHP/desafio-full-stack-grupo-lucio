import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { admin } from 'src/config/firebase.config';

@Injectable()
export class UsuariosService {
  private readonly firestore = admin.firestore();
  async listarUsuarios(uid) {
    const usuarioSnapshot = await this.firestore
      .collection('usuarios')
      .where('uid', '==', uid)
      .get();
    if (usuarioSnapshot.empty) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    const usuarioData = usuarioSnapshot.docs[0].data();
    if (!usuarioData.isAdmin) {
      throw new UnauthorizedException(
        'Acesso negado: usuário não é administrador',
      );
    }
    const snapshot = await this.firestore.collection('usuarios').get();
    return snapshot.docs.map((doc) => {
      return { uid: doc.id, ...doc.data() };
    });
  }

  async atualizarAdmin(
    uidSolicitante: string,
    uid: string,
    isAdmin: boolean,
  ): Promise<void> {
    const usuarioSnapshot = await this.firestore
      .collection('usuarios')
      .where('uid', '==', uidSolicitante)
      .get();
    if (usuarioSnapshot.empty) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    const usuarioData = usuarioSnapshot.docs[0].data();
    if (!usuarioData.isAdmin) {
      throw new UnauthorizedException(
        'Acesso negado: usuário não é administrador',
      );
    }
    const userRef = await this.firestore
      .collection('usuarios')
      .where('uid', '==', uid)
      .get();

    if (userRef.empty) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const usuarioDocId = userRef.docs[0].id;
    await this.firestore
      .collection('usuarios')
      .doc(usuarioDocId)
      .update({ isAdmin });
  }
}
