import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PropertyModule } from './property/property.module';
import { Region } from './region/region.entity';
import { Property } from './property/property.entity';
import { Lead } from './lead/lead.entity';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RegionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'crazy1ndn',
      password: 'null',
      database: 'crazy1ndn',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PropertyModule,
    LeadModule,
    TypeOrmModule.forFeature([Region, Property, Lead]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
