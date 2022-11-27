import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }

    return res.redirect(
      'http://localhost:3000/' +
        JSON.stringify({
          ...req.user,
          access_token: this.jwtService.sign({
            user: req.user.email,
          }),
        }),
    ); /* {
      ...req.user,
      access_token: this.jwtService.sign({
        user: req.user.email,
      }),
    }; */
  }
}
