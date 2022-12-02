import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthService {
  constructor(private jwtService: JwtService) {}

  async googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }

    const resultat = {
      ...req.user,
      access_token: this.jwtService.sign(req.user),
    };
    console.log(req.user);

    return res.set({'Set-Cookie': 'access_token='+resultat.access_token+'; Domain=.netlify.app; SameSite=Strict'}).json(res.user);
    /* return res.cookie('access_token', resultat.access_token, {
      maxAge: 3600 * 1000,
      domain: '.netlify.app',
      sameSite: 'lax',
      httpOnly: true,
    }).json(res.user); */

    //  res.redirect(process.env.REACT_FRONT_URI);

    // return res.json(req.user);

    /* return res.cookie('access_token', resultat.access_token, {
      maxAge: 3600 * 1000,
      domain: 'netlify.app',
      httpOnly: false,
      path: '/',
    }).redirect(process.env.REACT_FRONT_URI); */
  }
}
