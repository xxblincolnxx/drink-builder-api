import { Module } from '@nestjs/common';
import { BottlesController } from './bottles.controller';
import { BottlesService } from './bottles.service';

@Module({
  controllers: [BottlesController],
  providers: [BottlesService]
})
export class BottlesModule {}
