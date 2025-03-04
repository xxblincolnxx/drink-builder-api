import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
