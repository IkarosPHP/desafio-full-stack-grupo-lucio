import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private 
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() userData: { email: string; password: string; displayName?: string }) {
    try {
      const user = await this.authService.registerUser(
        userData.email,
        userData.password,
        userData.displayName
      );
      return { message: 'User registered successfully', userId: user.uid };
    } catch (error) {
      return { message: 'Failed to register user', error: error.message };
    }
  }
}
