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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: process.env.DB_USERNAME ?? 'crazy1ndn',
      password: process.env.DB_PASSWORD ?? 'null',
      database: process.env.DB_NAME ?? 'crazy1ndn',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    RegionModule,
    ConfigModule.forRoot(),
    PropertyModule,
    LeadModule,
    TypeOrmModule.forFeature([Region, Property, Lead]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
