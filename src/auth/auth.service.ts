import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/dto/create-user.request';
import { Response } from 'express';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const accessTokenSecret = 'JWT_ACCESS_TOKEN_SECRET';
    const accessTokenExpiration = 'JWT_ACCESS_TOKEN_EXPIRATION_MS';
    const { expiresTime: expiresTimeAccess, token: accessToken } =
      this.createToken(user, accessTokenSecret, accessTokenExpiration);

    const refreshTokenSecret = 'JWT_REFRESH_TOKEN_SECRET';
    const refreshTokenExpiration = 'JWT_REFRESH_TOKEN_EXPIRATION_MS';
    const { expiresTime: expiresTimeRefresh, token: refreshToken } =
      this.createToken(user, refreshTokenSecret, refreshTokenExpiration);

    await this.usersService.updateUserRefreshToken(user, refreshToken);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresTimeAccess,
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresTimeRefresh,
    });
  }

  private createToken(user: User, secretKey: string, expKey: string) {
    const expiresTime = new Date();
    expiresTime.setMilliseconds(
      expiresTime.getTime() +
        parseInt(this.configService.getOrThrow<string>(expKey)),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    };

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>(secretKey),
      expiresIn: `${this.configService.getOrThrow(expKey)}ms`,
    });
    return { expiresTime, token };
  }

  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.getUser({ email, id: null });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
