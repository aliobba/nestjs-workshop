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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthController = void 0;
const common_1 = require("@nestjs/common");
const google_auth_service_1 = require("./google-auth.service");
const google_auth_guard_1 = require("./guards/google-auth.guard");
let GoogleAuthController = class GoogleAuthController {
    constructor(googleAuthService) {
        this.googleAuthService = googleAuthService;
    }
    async googleAuth(req) { }
    async googleAuthRedirect(req, res) {
        this.googleAuthService.googleLogin(req, res);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('auth/google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleAuthRedirect", null);
GoogleAuthController = __decorate([
    (0, common_1.Controller)('googleAuth'),
    __metadata("design:paramtypes", [google_auth_service_1.GoogleAuthService])
], GoogleAuthController);
exports.GoogleAuthController = GoogleAuthController;
//# sourceMappingURL=google-auth.controller.js.map