import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StocksService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('FINNHUB_API_KEY');
  }

  async getIndices(): Promise<any> {
    try {
      const url = `https://api.polygon.io/v3/reference/tickers?market=indices&active=true&order=asc&limit=100&sort=ticker&apiKey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching indices:', error.message);
    }
  }

  async getChartData(ticker: string): Promise<any> {
    try {
      const url = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching indices:', error.message);
    }
  }
}
