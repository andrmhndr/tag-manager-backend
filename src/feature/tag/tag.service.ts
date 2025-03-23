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
        search = '';
      }

      const tags = await this.tagModel.aggregate([
        {
          $lookup: {
            from: 'books',
            localField: '_id',
            foreignField: 'tags',
            as: 'books',
          },
        },
        {
          $addFields: {
            count: { $size: '$books' },
          },
        },
        {
          $match: {
            deletedAt: null,
            ...(search
              ? {
                  $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { hex: { $regex: search, $options: 'i' } },
                  ],
                }
              : {}),
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 1,
            name: 1,
            hex: 1,
            count: 1,
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
