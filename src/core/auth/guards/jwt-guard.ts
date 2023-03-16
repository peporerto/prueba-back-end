import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ConsoleService } from 'src/core/console/console.service';
import { TokenPayload } from '../enums/token-type.enum';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces/payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private consoleService: ConsoleService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<any> {
    const req = ctx.switchToHttp().getRequest();
    try {
      //! Validar si hay un token de acceso en el encabezado
      this.consoleService.title('VALIDACION SEGURIDAD');
      const message = this.consoleService.statusMessage(
        'Tiene el encabezado correcto',
      );
      if (!req.headers['authorization']) {
        message(false);
        throw new BadRequestException(
          'No hay token de acceso en el encabezado',
        );
      }
      message(true);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException('Invalid JSON object');
      }
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token is expired');
      }
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(error.message);
      }
    }
    const authorization = req.get('authorization');
    let context: TokenPayload;
    //? Decodifica el encabezado
    const message = this.consoleService.statusMessage(
      'Decodificando el encabezado del token',
    );
    if (!authorization) {
      message(false);
      throw new BadRequestException('No se encuentra el encabezado del token');
    }
    message(true);
    if (authorization) {
      const token = authorization.substring(7);
      console.log(token);
      context = await this.jwtService
        .verify(token, { secret: process.env.JWT_SECRET })
        .catch(() => {
          throw new UnauthorizedException();
        });
    }
    const { userId } = context;
    const response = await this.authService.findByUserId(userId);
    if (!response) {
      message(false);
    }
  }
}
