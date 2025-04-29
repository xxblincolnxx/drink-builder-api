import { Module } from '@nestjs/common';
import { MixersController } from './mixers.controller';
import { MixersService } from './mixers.service';

@Module({
  controllers: [MixersController],
  providers: [MixersService],
})
export class MixersModule {}
