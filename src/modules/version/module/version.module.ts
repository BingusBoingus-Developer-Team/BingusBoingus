import { Module } from '@nestjs/common';
import { VersionService } from '../service/version.service';
import { VersionController } from '../controller/version.controller';

@Module({
  imports: [],
  controllers: [VersionController],
  providers: [VersionService],
  exports: [VersionService],
})
export class VersionModule {}
