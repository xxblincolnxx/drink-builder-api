import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuRequest } from './dto/create-menu.request';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getMenus() {
    return this.menusService.getMenus();
  }

  @Post()
  async createMenu(@Body() request: CreateMenuRequest) {
    return this.menusService.createMenu(request);
  }
}
