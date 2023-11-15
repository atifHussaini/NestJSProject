import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';

@Module({
  imports: [RegionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
