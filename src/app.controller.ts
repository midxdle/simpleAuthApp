import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  // @UseGuards(AuthGuard('local'))
  // we are using an AuthGuard that @nestjs/passport automatically provisioned
  // our passport strategy has a default name of 'local' that we refrence in @UseGuards()
  // passing the strategy name directly to the AuthGuard() introduces magic strings
  // so instead creating your own class is better

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  // Passport automatically creates a user object, based on the value we return from validate()
  // then assigns it to Request object as req.user

  // we've decorated the route using the built-in AuthGuard provided by the passport local strategy
  // the route handler will only be invoked if the user has been validated
  // the req parameter will contain a user property(populated by Passport during the passport-local auth flow)
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.user;
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  // when our GET /profile route is hit, the Guard will automatically invoke our passport-jwt custom config logic
  // validating the JWT, and assigning the user property to the Request object
}
