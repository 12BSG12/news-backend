import { UserService } from './../../user/user.service';
import { jwtConstants } from './../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userService.findByCond({
      email: payload.email,
    });
    
    if (!user){
      throw new UnauthorizedException('Нет доступа к этой странице');
    } 
    
    return { id: payload.sub, email: payload.email };
  }
}
