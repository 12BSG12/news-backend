import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserEntity } from './../user/entities/user.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
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
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;

    return this.makeJwtData(userData);
  }

  async register(dto: CreateUserDto) {
    try {
      const { password, ...user } = await this.userService.create(dto);

      return this.makeJwtData(user);
    } catch (error) {
      throw new ForbiddenException('Данный e-mail уже существует');
    }
  }
}
