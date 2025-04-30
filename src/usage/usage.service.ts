import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsageService implements OnModuleInit {
  private usageStats: Record<string, number> = {};

  onModuleInit() {
    this.usageStats = {};
  }

  logUsage(endpoint: string) {
    this.usageStats[endpoint] = (this.usageStats[endpoint] || 0) + 1;
  }

  getUsage() {
    return this.usageStats;
  }
}
