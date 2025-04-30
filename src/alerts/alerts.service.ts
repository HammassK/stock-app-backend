import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Alert } from './interfaces/alert.interface';
import { StocksService } from '../stocks/stocks.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AlertsService {
  private alerts: Alert[] = [];

  constructor(private readonly stocksService: StocksService) {}

  addAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  @Cron('*/5 * * * *') // Every 5 minutes
  async handleCron() {
    for (const alert of this.alerts) {
      const data = await this.stocksService.getChartData(alert.symbol);
      const latestPrice = data.c[data.c.length - 1];

      if (
        (alert.direction === 'above' && latestPrice > alert.threshold) ||
        (alert.direction === 'below' && latestPrice < alert.threshold)
      ) {
        await this.sendEmail(alert.email, alert.symbol, latestPrice);
      }
    }
  }

  private async sendEmail(to: string, symbol: string, price: number) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
      },
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to,
      subject: `Alert: ${symbol} price threshold reached`,
      text: `The price of ${symbol} has reached ${price}.`,
    };

    await transporter.sendMail(mailOptions);
  }
}
