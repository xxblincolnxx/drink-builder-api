import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    MenusModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class AppModule {}
