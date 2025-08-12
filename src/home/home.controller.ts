import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { HomeService } from './home.service';
import { ApiResponseHelper } from '../utils/api-response';
import { ApiResponseDto } from '../utils/dto/api-response.dto';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  @ApiOkResponse({
    description: 'App information retrieved successfully',
    type: ApiResponseDto,
  })
  async appInfo() {
    const data = await this.service.appInfo();
    return ApiResponseHelper.success(
      data,
      'App information retrieved successfully',
    );
  }
}
