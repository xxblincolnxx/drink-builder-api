import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { BranchesModule } from './branches/branches.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { DrinksModule } from './drinks/drinks.module';
import { InventoryModule } from './inventory/inventory.module';
import { VendorsModule } from './vendors/vendors.module';
import { MixersModule } from './mixers/mixers.module';
import { CategoriesModule } from './categories/categories.module';
import { SpiritsModule } from './spirits/spirits.module';
import { BottlesModule } from './bottles/bottles.module';
import { IdentifiersModule } from './identifiers/identifiers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    MenusModule,
    AuthModule,
    BranchesModule,
    OrganizationsModule,
    DrinksModule,
    InventoryModule,
    VendorsModule,
    MixersModule,
    CategoriesModule,
    SpiritsModule,
    BottlesModule,
    IdentifiersModule,
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class AppModule {}
