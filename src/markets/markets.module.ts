import { Module } from '@nestjs/common';
import { MarketsController } from './controllers/markets.controller';
import { MarketsService } from './services/markets.service';

@Module({
  controllers: [MarketsController],
  providers: [MarketsService],
})
export class MarketsModule {}
