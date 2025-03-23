import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { DeleteBookDto } from './dto/delete_book.dto';
import { CreateBookDto } from './dto/create_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBook() {
    return this.bookService.getBook();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  async createBook(@Body() props: CreateBookDto) {
    return this.bookService.createBook({
      data: {
        ...props,
      },
    });
  }

  @Delete()
  async DeleteBook(@Body() props: DeleteBookDto) {
    return this.bookService.deleteBook({ id: props.id });
  }

  @Put()
  async updateBook(@Body() props: UpdateBookDto) {
    return this.bookService.updateBook({ data: props });
  }
}
