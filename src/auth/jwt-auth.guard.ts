import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard(
  'jwt',
) /* (['strategyTwo', 'strategyOne', '...']) */ {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // add your custom logic authentication logic here
    // for example, call super.login(request) to establish a session
    return super.canActivate(context);

    // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    // context.getHandler(),
    // context.getClass(),
    // ]);
    // if (isPublic) {
    // return true;
    // }
    // return super.canActivate(context)
    // use Reflector class to JwtAuthGuard return true when the "isPublic" metadata is found
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context?: ExecutionContext,
    status?: any,
  ): TUser {
    // you can throw an exception based on either 'info' or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
} // Extended Guards
