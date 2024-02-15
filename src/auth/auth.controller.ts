import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RequestWIthUser } from '../interfaces/requestWIthUser';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }
  //
  // @Post('/login')
  // async loginUser(@Body() loginUserDto: LoginUserDto) {
  //   const user = await this.authService.loginUser(loginUserDto);
  //   const token = await this.authService.generateToken(user.id);
  //   return { user, token };
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Req() req: RequestWIthUser) {
    //const user = await this.authService.loginUser(loginUserDto);
    const { user } = req;
    const token = await this.authService.generateToken(user.id);
    return { user, token };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req: RequestWIthUser) {
    return req.user;
  }

  @Post('/email/send')
  async emailSend(@Body('email') email: string) {
    return this.authService.emailSender(email);
  }

  @Post('email/check')
  async emailChecker(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.emailChecker(email, code);
  }
}
