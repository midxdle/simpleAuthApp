import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // export class JwtStrategy extends PassportStrategy(Strategy, 'customName')
  // refer to above JwtStrategy via a decorator like @UseGuards(AuthGuard('customName'))
  constructor(private authService: AuthService) {
    super();
    /* 
    super({
      usernameField: 'email',
      password: 'password',
    }); 
    */ // we can pass strategies an options object in their contructors
    // or pass any customization options using register()
    // for example: PassportModule.register({ session: true });
  }
  /* 
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

    async validate(
      request: Request,
      username: string,
      password: string,
    ) {
      const contextId = ContextIdFactory.getByRequest(request);
      // AuthService is a request-scoped provider
      const authService = await this.moduleRef.resolve(AuthService, contextId);
    } // the request instance will be used to obtain the current context identifier, instead of generating a new one
    // we used the getByRequest() method of ContextIdFactory class to create a context id based on the request object
  */ // Request-Scoped strategy

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
