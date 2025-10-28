import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase.guard';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @Get()
  @UseGuards(FirebaseAuthGuard)
  async listarReservas(@Req() req) {
    const uid = req.user.uid;
    return this.usuariosService.listarUsuarios(uid);
  }

  @Put()
  @UseGuards(FirebaseAuthGuard)
  async atualizarAdmin(@Req() req, @Body() body:{uid: string, isAdmin: boolean}) {
    return this.usuariosService.atualizarAdmin(req.user.uid ,body.uid, body.isAdmin);
  }
}
