import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreatePhotoDto } from './AlbumDto/album.dto';
import { arrayUnique } from 'class-validator';
import { filterPagination } from 'src/paginate/paginate';
import { DefaultMessage, ResponseStatus } from 'src/utils/constants';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import { multerConfig } from 'src/multer.config';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumsService: AlbumService) {}

  async findalbums(payload): Promise<any> {
    return await this.albumsService.getSinglealbum(payload);
  }

  @Get()
  async getalbum(@Query() params: {}): Promise<any> {
    const fields = ['name', 'email'];
    const filters = filterPagination(fields, params);
    return await this.albumsService.getAllalbum(
      filters?.payload,
      filters?.paginationQuery,
    );
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async createAlbum(@Body() createAlbumDto: CreatePhotoDto) {
    console.log(createAlbumDto, 'create');
    return await this.albumsService.createalbum(createAlbumDto);
  }

  @Get(':id')
  async getalbumbyId(@Param('id') id: string): Promise<any> {
    return await this.findalbums({ _id: id });
  }

  @Put(':id')
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
