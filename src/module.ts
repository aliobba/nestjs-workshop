import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GoogleAuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
