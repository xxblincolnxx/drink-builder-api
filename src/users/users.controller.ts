import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, User } from './dto/create-user.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('menus')
  @UseGuards(JwtAuthGuard)
  async getUserMenus(@CurrentUser() user: User) {
    return this.usersService.getUserMenus(user);
  }
}
