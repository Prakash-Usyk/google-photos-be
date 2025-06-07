import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreatePhotoDto } from './AlbumDto/album.dto';
import { filterPagination } from 'src/paginate/paginate';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumsService: AlbumService) {}

  async findalbums(payload): Promise<any> {
    return await this.albumsService.getSinglealbum(payload);
  }

  @Get()
  async getalbum(@Query() params: {}): Promise<any> {
    const fields = ['name', 'description', 'meta_data'];
    const filters = filterPagination(fields, params);
    return await this.albumsService.getAllalbum(
      filters?.payload,
      filters?.paginationQuery,
    );
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async createAlbum(@Body() createAlbumDto: CreatePhotoDto) {
    return await this.albumsService.createalbum(createAlbumDto);
  }

  @Get(':id')
  async getalbumbyId(@Param('id') id: string): Promise<any> {
    return await this.findalbums({ _id: id });
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async updatealbumbyId(
    @Param('id') id: string,
    @Body() createAlbumDtos: CreatePhotoDto,
  ): Promise<any> {
    return await this.albumsService.updatealbum(createAlbumDtos, id);
  }

  @Delete(':id')
  async deletealbumbyId(@Param('id') id: string): Promise<any> {
    return await this.albumsService.deletealbum({ _id: id });
  }
}
