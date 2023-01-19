import { LoginInput } from './dto/inputLogin.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByCond({
      email,
      password,
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  makeJwtData(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };

    return {
      ...data,
      token: this.jwtService.sign(payload),
    };
  }

  async login(LoginInput: LoginInput) {
    const user = await this.userService.findByCond(LoginInput);
    return this.makeJwtData(user);
  }

  async register(dto: CreateUserDto) {
    try {
      const { password, ...user } = await this.userService.create({
        fullName: dto.fullName,
        email: dto.email,
        password: dto.password
      });

      return this.makeJwtData(user);
    } catch (error) {
      throw new ForbiddenException('Данный e-mail уже существует');
    }
  }
}
