import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './interface/cat.interface';
import { InternalServerException } from '../exception/internal_server.exception';
import { ValidationPipe } from '../pipe/validation.pipe';
import { ParseIntPipe } from '../pipe/parse_int.pipe';
import Roles from '../decorator/roles.decorator';
import { RoleGuard } from '../guards/role.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { ExcludeNullInterceptor } from '../interceptor/exclude-null.interceptor';

@Controller('cat')
@UseGuards(RoleGuard)
@UseInterceptors(
  LoggingInterceptor,
  TransformInterceptor,
  ExcludeNullInterceptor,
)
export class CatController {
  constructor(private catService: CatService) {}

  @Get('/')
  @Roles('admin', 'customer')
  async findAll(): Promise<Cat[]> {
    try {
      return await this.catService.getAllCats();
    } catch (e) {
      throw new InternalServerException();
    }
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    try {
      return await this.catService.findCatById(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Post('/')
  async addCat(@Body(new ValidationPipe()) body: Cat): Promise<Cat> {
    return await this.catService.create(body);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async updateCat(@Body() body, @Param('id', ParseIntPipe) id: number) {
    return await this.catService.updateCat(body, id);
  }

  @Delete('/:id')
  @Roles('admin')
  async deleteCat(@Param('id', ParseIntPipe) id: number) {
    return await this.catService.deleteCat(id);
  }
}
