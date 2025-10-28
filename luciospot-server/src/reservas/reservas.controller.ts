import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase.guard';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async criarReserva(
    @Req() req,
    @Body() body: { idMesa: number; idHorario: number; data: string },
  ) {
    try {
      const uid = req.user.uid;
      const id = await this.reservasService.criarReserva(
        uid,
        body.idMesa,
        body.idHorario,
        body.data,
      );
      return { id, message: 'Reserva criada com sucesso!' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async listarReservas(@Req() req) {
    const email = req.user.email;
    return this.reservasService.listarReservasPorUsuario(email);
  }

  @Get('dia/:data')
  @UseGuards(FirebaseAuthGuard)
  async listarReservasPorDia(@Req() req, @Param('data') data: string) {
    return this.reservasService.listarReservasPorDia(data);
  }

  @Post('cancelar/:id')
  @UseGuards(FirebaseAuthGuard)
  async cancelarReservaPorId(@Req() req, @Param('id') id: string){
    return this.reservasService.cancelarReservaPorId(id);
  }

  @Get('kpi')
  @UseGuards(FirebaseAuthGuard)
  async listarTodasReservas(@Req() req) {
    const uid = req.user.uid;
    return this.reservasService.listarTodasReservas(uid);
  }
}
