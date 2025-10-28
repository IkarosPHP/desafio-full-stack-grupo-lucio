import { Injectable, UnauthorizedException } from '@nestjs/common';
import { admin } from 'src/config/firebase.config';

@Injectable()
export class ReservasService {
  private readonly firestore = admin.firestore();

async criarReserva(
  uid: string,
  idMesa: number,
  idHorario: number,
  data: string,
) {
  const usuarioDoc = await this.firestore
    .collection('usuarios')
    .where('uid', '==', uid)
    .get();
  if (usuarioDoc.empty) throw new Error('Usuário não encontrado.');

  const usuarioData = usuarioDoc.docs[0].data();
  const email = usuarioData?.email;
  const reservasDia = await this.firestore
    .collection('reservas')
    .where('usuario', '==', email)
    .where('data', '==', data)
    .where('isCancelada', '==', false)
    .get();
  if (reservasDia.size >= 2) {
    throw new Error('Cada usuário só pode fazer duas reservas por dia.');
  }
  const reservaHorario = reservasDia.docs.find(r => r.data().idHorario === idHorario);
  if (reservaHorario) {
    throw new Error('Já existe uma reserva para este horário neste dia.');
  }
  const existente = await this.firestore
    .collection('reservas')
    .where('data', '==', data)
    .where('idMesa', '==', idMesa)
    .where('idHorario', '==', idHorario)
    .where('isCancelada', '==', false)
    .limit(1)
    .get();

  if (!existente.empty) {
    throw new Error('Esta mesa já está reservada para este horário.');
  }
  const reservaData = {
    idMesa,
    idHorario,
    data,
    usuario: email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isCancelada: false,
  };

  const docRef = await this.firestore.collection('reservas').add(reservaData);
  return docRef.id;
}

  async listarReservasPorUsuario(uid: string) {
    const snapshot = await this.firestore
      .collection('reservas')
      .where('usuario', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async listarReservasPorDia(dataIso: string) {
    const start = dataIso.slice(0, 10) + 'T00:00:00.000Z';
    const end = dataIso.slice(0, 10) + 'T23:59:59.999Z';

    const snapshot = await this.firestore
      .collection('reservas')
      .where('data', '>=', start)
      .where('data', '<=', end)
      .orderBy('data')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async cancelarReservaPorId(id: string): Promise<void> {
    await this.firestore.collection('reservas').doc(id).update({
      isCancelada: true,
    });
  }

  async listarTodasReservas(uid: string) {
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
    const snapshot = await this.firestore.collection('reservas').get();
    const reservas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return reservas;
  }
}
