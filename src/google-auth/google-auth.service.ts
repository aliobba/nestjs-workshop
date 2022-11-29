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

    /* res.cookie('access_token', resultat.access_token, {
      maxAge: 3600 * 1000,
      sameSite: 'none',
      secure: true,
      httpOnly: false,
      path: '/',
    });
    res.redirect('https://aliobba.github.io/reactjs-workshop/'); */
    // Domain
    res.setHeader('Set-Cookie', `access_token=${resultat.access_token}; Domain=aliobba.github.io`);

    // Secure
    res.setHeader('Set-Cookie', `access_token=${resultat.access_token}; Secure`);

    // SameSite
    res.setHeader('Set-Cookie', `access_token=${resultat.access_token}; SameSite=Strict`);
    return res.redirect('https://aliobba.github.io/reactjs-workshop/');
  }
}
