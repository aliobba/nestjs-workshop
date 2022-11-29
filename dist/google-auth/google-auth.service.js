"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let GoogleAuthService = class GoogleAuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    googleLogin(req, res) {
        if (!req.user) {
            return 'No user from google';
        }
        const resultat = Object.assign(Object.assign({}, req.user), { access_token: this.jwtService.sign(req.user) });
        console.log(req.user);
        return res.cookie('access_token', resultat.access_token, {
            maxAge: 3600 * 1000,
            sameSite: 'none',
            secure: true,
            httpOnly: false,
            path: '/',
        });
    }
};
GoogleAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], GoogleAuthService);
exports.GoogleAuthService = GoogleAuthService;
//# sourceMappingURL=google-auth.service.js.map