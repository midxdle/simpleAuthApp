import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  // by importing the same secret used when we signed the JWT,
  // we ensure that the verify phase performed by Passport
  // and the sign phase performed in our AuthService, use a common secret
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
    // we configure the JwtModule using register()
  ],
  exports: [AuthService],
})
export class AuthModule {}
