import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private list: string[] = [];

  getHello(): string {
    return 'Bu da degisimden sonraki hali';
  }

  firstJson(): { 1: string; 2: string } {
    return { 1: '1', 2: '2' };
  }

  addToList(text: string): void {
    this.list.push(text);
  }

  getList(): string[] {
    return this.list;
  }
}
