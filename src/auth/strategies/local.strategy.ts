import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  // Everything we return from here will be added to the request object under the user property allowing us to access the user during any request we make.
  async validate(email: string, password: string) {
    return this.authService.verifyUser(email, password);
  }
}
