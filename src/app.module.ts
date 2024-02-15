import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppconfigModule } from './appconfig/appconfig.module';
import { DblistModule } from './dblist/dblist.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserModule, AppconfigModule, DblistModule, AuthModule, RedisModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
