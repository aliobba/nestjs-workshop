import { Controller, Get, Param, UseGuards, Body, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/google-auth/guards/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userID')
  async getUser(@Param('userID') userId) {
    return this.usersService.getUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:nom/:prenom')
  async addUser(@Param('nom') nom, @Param('prenom') prenom, @Body('img') img) {
    const user = {
        nom,
        prenom,
        img
    }
    return this.usersService.addUser(user);
  }
  
}
