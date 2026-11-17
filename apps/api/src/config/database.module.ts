import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.uri'),
        connectionFactory: (connection) => {
          connection.on('connected', () =>
            new Logger('Database').log('MongoDB connected'),
          );
          connection.on('error', (e: Error) =>
            new Logger('Database').error(`MongoDB error: ${e.message}`),
          );
          return connection;
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
