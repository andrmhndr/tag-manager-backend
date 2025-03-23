import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create_tag.dto';
import { DeleteTagDto } from './dto/delete_tag.dto';
import { UpdateTagDto } from './dto/update_tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTag() {
    return this.tagService.getTag();
  }

  @Get('suggestions')
  async getSuggestion(@Query('search') search: string) {
    return this.tagService.getTagSuggestions(search);
  }

  @Get(':id')
  async getTagById(@Param('id') id: string) {
    return this.tagService.getTagById(id);
  }

  @Post()
  async createTag(@Body() props: CreateTagDto) {
    return this.tagService.createTag({ data: { ...props } });
  }

  @Delete()
  async deleteTag(@Body() props: DeleteTagDto) {
    return this.tagService.deleteTag({ id: props.id });
  }

  @Put()
  async updateTag(@Body() props: UpdateTagDto) {
    return this.tagService.updateTag({ data: props });
  }
}
