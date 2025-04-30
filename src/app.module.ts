import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { StocksModule } from './stocks/stocks.module';
import { AlertsModule } from './alerts/alerts.module';
import { UsageModule } from './usage/usage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    ScheduleModule.forRoot(),
    StocksModule,
    AlertsModule,
    UsageModule,
  ],
})
export class AppModule {}
