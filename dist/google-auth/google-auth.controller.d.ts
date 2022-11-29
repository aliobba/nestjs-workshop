import { GoogleAuthService } from './google-auth.service';
export declare class GoogleAuthController {
    private readonly googleAuthService;
    constructor(googleAuthService: GoogleAuthService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<void>;
}
