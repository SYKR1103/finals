import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { TokenPayloadInterface } from '../interfaces/tokenPayload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findoneByEmail(loginUserDto.email);
    const ispwMatched = user.checkPassword(loginUserDto.password);
    return user;
  }

  public generateToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    return token;
  }

  async emailSender(email: string) {
    const vericode = this.generateOTP();
    await this.cacheManager.set(email, vericode);
    await this.emailService.sendMail({
      to: email,
      subject: `verification code`,
      text: `verification code is ${vericode}`,
    });
    return 'success';
  }

  async emailChecker(email: string, code: string) {
    const realcode = await this.cacheManager.get(email);
    if (realcode !== code)
      throw new HttpException('wrong code', HttpStatus.BAD_REQUEST);
    return true;
  }

  generateOTP() {
    let OTP = '';
    for (let i = 1; i <= 6; i++) {
      OTP += Math.ceil(Math.random() * 10);
    }
    return OTP;
  }
}
