import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login() {
    // This is where we'll create a JWT token and return it to the client. It will then use JWT to authenticate itself in future requests.
  }
}
