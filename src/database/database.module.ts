import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from 'src/feature/tag/schema/tag.schema';
import { Book, BookSchema } from 'src/feature/book/schema/book.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [MongooseModule],
})
export class DatabaseModule {}
