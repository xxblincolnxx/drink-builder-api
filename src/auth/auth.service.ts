/* eslint-disable @typescript-eslint/require-await */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/dto/create-user.request';
import { Response } from 'express';
import { TokenPayload } from './utils/token-payload.interface';
import {
  accessTokenExpiration,
  accessTokenSecret,
  refreshTokenExpiration,
  refreshTokenSecret,
} from './utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const { expiresTime: expiresTimeAccess, token: accessToken } =
      this.createToken(user, accessTokenSecret, accessTokenExpiration);

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

  async logout(response: Response) {
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
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

  async verifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.usersService.getUser({ email: null, id: userId });
      const authenticated = user.refreshToken
        ? await compare(refreshToken, user.refreshToken)
        : false;

      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }
}
