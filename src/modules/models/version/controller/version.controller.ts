import {
    Get,
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
    ValidationPipe,
    UsePipes,
    Inject,
  } from '@nestjs/common';
  import {
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { VersionService } from '../service/version.service';
import { ReS } from '../../../../common/res.model';
  
  @Controller('version')
  @ApiTags('version')
  @UseGuards()
  @ApiExtraModels(ReS)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  export class VersionController {
    constructor(
        @Inject(VersionService)
      private readonly versionService: VersionService,
    ) {
    }
  
    @Get('/')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    @ApiOperation({
      summary: 'get version metadata',
      description: 'gets the current running version of the application',
    })
    async getVersion(): Promise<ReS<{version: string}>> {
      return ReS.FromData({
          version: await this.versionService.getVersion()
      }
      );
    }
  }
  