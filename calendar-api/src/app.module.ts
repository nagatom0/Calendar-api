import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { PrismaModule } from './prisma/prisma.module'
import { UsersnpxController } from './nest/modules/usersnpx/usersnpx.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UsersModule, AuthModule, SchedulesModule, AppointmentsModule, PrismaModule],
  controllers: [AppController, UsersnpxController],
  providers: [AppService],
})
export class AppModule { }
