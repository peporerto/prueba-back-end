import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { AuthService } from './auth.service';
import { LoginDTO } from './DTO/login.DTO';
import { RegisterDTO } from './DTO/register.DTO';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin/login')
  singin(@Body() loginDTO: LoginDTO) {
    return this.authService.singin(loginDTO);
  }

  @Post('signup')
  registerUser(@Body() registerDTO: RegisterDTO) {
    return this.authService.registerUser(registerDTO);
  }
}
