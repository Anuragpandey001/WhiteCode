import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IndustriesController } from './industries.controller';
import { IndustriesService } from './industries.service';
import { Industry, IndustrySchema } from './models/industry.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Industry.name, schema: IndustrySchema },
    ]),
  ],
  controllers: [IndustriesController],
  providers: [IndustriesService],
  exports: [IndustriesService, MongooseModule],
})
export class IndustriesModule {}
