import { Controller, Post, Body } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from './interfaces/alert.interface';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  createAlert(@Body() alert: Alert) {
    this.alertsService.addAlert(alert);
    return { message: 'Alert created successfully' };
  }
}
