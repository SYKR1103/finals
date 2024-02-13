import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppconfigModule } from './appconfig/appconfig.module';
import { DblistModule } from './dblist/dblist.module';

@Module({
  imports: [UserModule, AppconfigModule, DblistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}