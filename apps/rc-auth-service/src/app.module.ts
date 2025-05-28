import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule, ConfigModule, LoggerModule } from '@app/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, ConfigModule, UsersModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
