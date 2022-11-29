import { JwtService } from '@nestjs/jwt';
export declare class GoogleAuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    googleLogin(req: any, res: any): string;
}
