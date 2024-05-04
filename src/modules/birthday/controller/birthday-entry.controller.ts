import {
    Get,
    Post,
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
    ValidationPipe,
    UsePipes,
    Inject,
    Body,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import {
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { ReS } from '../../../common/res.model';
import { BirthdayEntryService } from '../service/birthday-entry.service';
import { BirthdayEntryDocument } from '../../../schemas/birthday-entry.schema';
import { CreateOrUpdateBirthdayEntryDto } from '../dto/create-or-update-birthday-entry.dto';
  
  @Controller('birthday-entry')
  @ApiTags('birthday-entry')
  @UseGuards()
  @ApiExtraModels(ReS)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  export class BirthdayEntryController {
    constructor(
        @Inject(BirthdayEntryService)
      private readonly birthdayEntryService: BirthdayEntryService,
    ) {
    }
  
    @Get('/')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    @ApiOperation({
      summary: 'get all birthday entries',
      description: 'returns all birthday entries',
    })
    
    async getEntryForToday(): Promise<ReS<BirthdayEntryDocument[]>> {
      return ReS.FromData(
        await this.birthdayEntryService.getEntryForToday()
      );
    }
  
    @Post('/')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({
      summary: 'create birthday entry',
      description:
        'creates a new birthday entry',
    })
    @ApiBody({ type: CreateOrUpdateBirthdayEntryDto })
    async createOrUpdate(
        @Body() inputs: CreateOrUpdateBirthdayEntryDto,
    ): Promise<ReS<BirthdayEntryDocument>> {
        try {
            return ReS.FromData(
                await this.birthdayEntryService.createOrUpdateBirthdayEntry(inputs)
            );
        } catch (error) {
            throw new UnprocessableEntityException(error.message)
        }
    }
  }
  