import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MarketsService } from '../services/markets.service';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  // market 상세보기
  @Get()
  getCurrentMarket() {
    return '';
  }

  // market list
  @Get()
  getMarkets() {
    return '';
  }

  // market 등록
  @Post()
  postMarket() {
    return '';
  }

  // market 수정
  @Put()
  updateMarket() {
    return '';
  }

  // market 삭제
  @Delete()
  deleteMarket() {
    return '';
  }
}
