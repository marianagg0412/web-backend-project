import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App') // Group this controller under the "App" tag in Swagger UI
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello World' }) // Describe the operation in Swagger UI
  getHello(): string {
    return this.appService.getHello();
  }
}
