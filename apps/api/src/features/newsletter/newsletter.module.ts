import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { Subscriber, SubscriberSchema } from './models/subscriber.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
    ]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService],
  exports: [NewsletterService, MongooseModule],
})
export class NewsletterModule {}
