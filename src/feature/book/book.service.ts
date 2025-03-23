import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { Model, Types } from 'mongoose';
import { TagDocument } from '../tag/schema/tag.schema';
import { UpdateBookDto } from './dto/update_book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async createBook({ data }: { data: any }) {
    try {
      const book = new this.bookModel({
        ...data,
        tags: data.tags?.map((tag) => new Types.ObjectId(tag)) || [],
      });

      await book.save();

      return book;
    } catch (error) {
      throw error;
    }
  }

  async getBook() {
    let result = await this.bookModel
      .find({ deletedAt: null })
      .sort({ updatedAt: -1 })
      .populate({ path: 'tags' });

    return result.map((book) => {
      return {
        ...book.toJSON(),
        tags: book.tags.reduce((prev, curr: TagDocument) => {
          if (curr.deletedAt == null) {
            prev.push(curr);
          }
          return prev;
        }, []),
      };
    });
  }

  async getBookById(id: string) {
    try {
      let result = await this.bookModel
        .findOne({ _id: id, deletedAt: null })
        .populate({ path: 'tags' });

      result.tags = result.tags.reduce((prev, curr: TagDocument) => {
        if (curr.deletedAt == null) {
          prev.push(curr);
        }
        return prev;
      }, []);

      if (!result) throw new NotFoundException('book not found');

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteBook({ id }: { id: string }) {
    try {
      const book = await this.bookModel.findById(id);

      if (!book) throw new NotFoundException('book not found');

      book.deletedAt = new Date();
      return await book.save();
    } catch (error) {
      throw error;
    }
  }

  async updateBook({ data }: { data: UpdateBookDto }) {
    try {
      const book = await this.bookModel.findOneAndUpdate(
        { _id: data._id },
        { ...data },
        { new: true },
      );

      return book;
    } catch (error) {
      throw error;
    }
  }
}
