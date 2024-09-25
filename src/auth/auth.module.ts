import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: '123123', //process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard], // Export the guard for use in other modules
})
export class AuthModule {}
