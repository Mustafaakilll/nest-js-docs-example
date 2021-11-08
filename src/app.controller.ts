import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/first')
  firstJson(): { 1: string; 2: string } {
    return this.appService.firstJson();
  }

  @Post('/list')
  addToList(@Body() text: string): void {
    console.log(text);
    // return this.appService.addToList(text);
  }

  @Get('/list')
  getList(): string[] {
    return this.appService.getList();
  }
}
