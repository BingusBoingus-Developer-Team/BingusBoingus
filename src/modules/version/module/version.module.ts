import { Module } from '@nestjs/common';
import { VersionService } from '../service/version.service';

@Module({
  imports: [],
  controllers: [],
  providers: [VersionService],
  exports: [VersionService],
})
export class VersionModule {}
