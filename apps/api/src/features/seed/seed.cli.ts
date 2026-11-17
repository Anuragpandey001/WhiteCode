/**
 * Standalone seeder:  npm run seed            (adds missing content)
 *                     npm run seed -- --reset (wipes demo data first)
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { SeedService } from './seed.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const seeder = app.get(SeedService);
  const reset = process.argv.includes('--reset');

  const summary = reset ? await seeder.reset() : await seeder.run(false);
  new Logger('SeedCLI').log(`Done: ${JSON.stringify(summary)}`);

  await app.close();
  process.exit(0);
}

main().catch((error) => {
  new Logger('SeedCLI').error(error?.message || error);
  process.exit(1);
});
