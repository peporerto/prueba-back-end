import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { equals } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { ConsoleService } from '../console/console.service';
import { Payload } from './interfaces/payload.interface';
import { IResponse } from './interfaces/res.interfaces';
import { USERS_REPOSITORY } from '../constants';
import { User } from 'src/modules';
import { RegisterDTO } from './DTO/register.DTO';
import { LoginDTO } from './DTO/login.DTO';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: typeof User,
    private jwtService: JwtService,
    private configService: ConfigService,
    private consoleService: ConsoleService,
  ) {}

  async createJwt(user: User): Promise<IResponse> {
    const payload: Payload = { userName: user.userName, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: this.configService.get('JWT_EXPIRES_IN'),
      message: 'Successfully logged in',
      status: true,
    };
  }

  validateUser(userName: string, password: string): Promise<User> {
    console.log(userName);
    return this.getUserbyuserName(userName).then(async (user) => {
      if (!user)
        this.consoleService.valueMesssage('User was not found with userName:')(
          user.userName,
        );
      return this.validationPass(password, user).then((pass) => {
        if (!pass) throw new UnauthorizedException('Invalid password');
        return user;
      });
    });
  }

  registerUser(registerDTO: RegisterDTO) {
    const { userName, email, fullName } = registerDTO;
    console.log(registerDTO);
    return this.getUserbydata(userName, email).then(async (userExists) => {
      if (!userExists) {
        const password = await this.hashPassword(registerDTO.password);
        try {
          return this.createUser(userName, email, fullName, password).then(
            (response) => {
              return this.genResponse(response);
            },
          );
        } catch (error) {
          throw new BadRequestException(`${error.driverError.detail}`);
        }
      }
      throw new BadRequestException('User already exists');
    });
  }

  singin(loginDTO: LoginDTO): Promise<IResponse> {
    console.log(loginDTO);
    const { userName, password } = loginDTO;
    return this.validateUser(userName, password).then((res) => {
      if (res) {
        return this.createJwt(res);
      }
    });
  }
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private validationPass(password: string, user: User): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  private genResponse(response: User): User {
    ['password', 'createdAt', 'updatedAt'].map((item) => {
      Object.keys(response).map((key) => {
        if (equals(key, item)) {
          delete response[key];
        }
      });
    });
    return response;
  }

  getUserbydata(userName: string, email?: string) {
    console.log(userName);
    return this.usersRepository.findOne({
      where: {
        [Op.or]: [{ userName }, { email }],
      },
    });
  }
  getUserbyuserName(userName: string) {
    return this.usersRepository.findOne({
      where: {
        userName,
      },
    });
  }

  createUser(
    userName: string,
    email: string,
    fullName: string,
    password: string,
  ) {
    return this.usersRepository.create({
      id: uuidv4(),
      userName,
      email,
      fullName,
      password,
    });
  }

  findByUserId(userId: string) {
    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
  }
  async validateByUserId(userId: string) {
    return await this.usersRepository.findOne({ where: { id: userId } });
  }
}
