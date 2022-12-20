import { LoginUserDto } from '../user/dto/login-user.dto';
import { LoginInput } from './dto/inputLogin.dto';
import { RegAndLoginResponse } from './dto/reg.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegAndLoginResponse)
  @UseGuards(LocalAuthGuard)
  async login(@Args() LoginInput: LoginInput) {
    return this.authService.login(LoginInput);
  }

  @Mutation(() => RegAndLoginResponse)
  register(@Args() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
