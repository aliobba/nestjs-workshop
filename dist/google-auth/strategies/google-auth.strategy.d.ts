import { VerifyCallback } from 'passport-google-oauth20';
import { GoogleAuthService } from '../google-auth.service';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly googleAuthService;
    constructor(googleAuthService: GoogleAuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
