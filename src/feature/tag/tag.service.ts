import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './schema/tag.schema';
import { Model } from 'mongoose';
import { generateRandomHexColor } from 'src/helper/color.helper';
import { Book, BookDocument } from '../book/schema/book.schema';
import { UpdateTagDto } from './dto/update_tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}
  async getTagSuggestions(search?: string) {
    try {
      if (!search || typeof search !== 'string') {
        search = ''; // Default value
      }

      const tags = await this.tagModel.aggregate([
        {
          $lookup: {
            from: 'books', // Koleksi buku tempat tag digunakan
            localField: '_id',
            foreignField: 'tags',
            as: 'books',
          },
        },
        {
          $addFields: {
            count: { $size: '$books' }, // Hitung jumlah buku yang memakai tag
          },
        },
        {
          $match: search
            ? {
                $or: [
                  { name: { $regex: search, $options: 'i' } }, // Cari di name
                  { hex: { $regex: search, $options: 'i' } }, // Cari di hex
                ],
              }
            : {},
        },
        { $sort: { count: -1 } }, // Urutkan berdasarkan penggunaan terbanyak
        { $limit: 10 }, // Batasi hasil ke 10 tag teratas
        {
          $project: {
            _id: 1,
            name: 1,
            hex: 1,
            count: 1, // Tambahkan jumlah penggunaan tag
          },
        },
      ]);

      return tags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async generateUniqueHexColor(): Promise<string> {
    let hex: string;
    let exists: any;

    do {
      hex = generateRandomHexColor();
      exists = await this.tagModel.exists({ hex, deletedAt: null });
    } while (exists);

    return hex;
  }

  async getTag() {
    return this.tagModel.find({ deletedAt: null }).sort({ updatedAt: -1 });
  }

  async getTagById(id: string) {
    try {
      const result = await this.tagModel.findOne({ _id: id, deletedAt: null });
      if (!result) throw new NotFoundException('tag not found');

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createTag({ data }: { data: Partial<Tag> }) {
    try {
      const tag = new this.tagModel({
        ...data,
        hex: await this.generateUniqueHexColor(),
      });

      await tag.save();

      return tag;
    } catch (error) {
      throw error;
    }
  }

  async deleteTag({ id }: { id: string }) {
    try {
      const tag = await this.tagModel.findById(id);
      if (!tag) throw new NotFoundException('tag not found!');

      tag.deletedAt = new Date();
      return await tag.save();
    } catch (error) {
      throw error;
    }
  }

  async updateTag({ data }: { data: UpdateTagDto }) {
    try {
      const tag = await this.tagModel.findOneAndUpdate(
        { _id: data._id },
        { ...data },
        { new: true },
      );

      return tag;
    } catch (error) {
      throw error;
    }
  }
}
