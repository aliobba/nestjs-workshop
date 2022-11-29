import { Controller, Get, UseGuards, Req, Res, Inject } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleOAuthGuard } from './guards/google-auth.guard';

@Controller('googleAuth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    this.googleAuthService.googleLogin(req, res);
  }
}
