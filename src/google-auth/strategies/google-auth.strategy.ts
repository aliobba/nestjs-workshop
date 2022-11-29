import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from '../google-auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly googleAuthService: GoogleAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/googleAuth/auth/google/callback',
      scope: ['email','profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, _raw } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    
    done(null, user);
  }
  /* async validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value
    };
    return user || null;
  } */
  /* async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const { name, emails, photos } = profile;
    
    const user = await this.googleAuthService.validateUser({
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value
    });
    console.log('Validate');
    console.log(user);
    return user || null;
  } */
}
