import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TagModule } from './feature/tag/tag.module';
import { BookModule } from './feature/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TagModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
