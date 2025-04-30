import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('indices')
  @ApiOperation({ summary: 'Get the S&P 500 index constituents' })
  @ApiResponse({
    status: 200,
    description: 'The list of indices retrieved successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getIndices() {
    return this.stocksService.getIndices();
  }

  @Get('chart')
  @ApiOperation({ summary: 'Get the chart data for a specific stock ticker  ' })
  @ApiQuery({ name: 'ticker', required: true, description: 'The stock ticker' })
  @ApiResponse({
    status: 200,
    description: 'Stock chart data retrieved successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getChartData(@Query('ticker') ticker: string) {
    return this.stocksService.getChartData(ticker);
  }
}
