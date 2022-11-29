import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthService {
  constructor(private jwtService: JwtService) {}

  googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }

    const resultat = {
      ...req.user,
      access_token: this.jwtService.sign(req.user),
    };
    console.log(req.user);

    return res.cookie('access_token', resultat.access_token, {
      maxAge: 3600 * 1000,
      domain: 'aliobba.github.io',
      httpOnly: false,
      path: '/',
    }).redirect('https://aliobba.github.io/reactjs-workshop/');
    // res.redirect('https://aliobba.github.io/reactjs-workshop/');
  }
}
