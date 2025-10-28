import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ReservasModule } from './reservas/reservas.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    AuthModule,
    ReservasModule,
    UsuariosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),],
})
export class AppModule {}
