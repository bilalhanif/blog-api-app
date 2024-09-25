import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Ensure User is included
  controllers: [UsersController],
  providers: [UsersService], // Add UserRepository here
  exports: [UsersService], // Export UsersService if needed elsewhere
})
export class UsersModule {}
