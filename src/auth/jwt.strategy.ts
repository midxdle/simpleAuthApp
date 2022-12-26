import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // initialization by passing in an options object in the super() call
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // supplies the method by which the JWT will be extracted from the Request
      // use the standard approach of supplying a bearer token in the Auth header

      ignoreExpiration: false,
      // delegates the responsibility of ensuring that a JWT has not expired to the passport module
      // if our route are supplied with an expired JWT, the reaquest will denied

      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
    // for the jwt-strategy, Passport first verifies the JWT'S signature and decodes the JSON
    // then invokes validate() method passing the decoded JSON
    // based on the way JWT signing works, we're guaranteed that we're receiving a valid token
    // response to validate() callback is an object containing userID and username properties
    // recall again that Passport will build a user object based on the return value of validate()
    // then attach it as a property on the Request object
  }
} // stateless JWT
