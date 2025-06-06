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
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './photoDto/photo.dto';
import { arrayUnique } from 'class-validator';
import { filterPagination } from 'src/paginate/paginate';
import { DefaultMessage, ResponseStatus } from 'src/utils/constants';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import { multerConfig } from 'src/multer.config';

@Controller('photos')
export class PhotossController {
  constructor(private readonly photosService: PhotosService) {}

  async findphotos(payload): Promise<any> {
    return await this.photosService.getSinglePhotos(payload);
  }

  @Get()
  async getPhotoss(@Query() params: {}): Promise<any> {
    const fields = ['name', 'email'];
    const filters = filterPagination(fields, params);
    return await this.photosService.getAllPhotos(
      filters?.payload,
      filters?.paginationQuery,
    );
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async createPhotos(
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() createPhotosDto: CreatePhotoDto,
  ) {
    return await this.photosService.createPhotos(files);
  }

  @Get(':id')
  async getPhotossbyId(@Param('id') id: string): Promise<any> {
    return await this.findphotos({ _id: id });
  }

  @Put(':id')
  async updatePhotossbyId(
    @Param('id') id: string,
    @Body() createPhotosDtos: CreatePhotoDto,
  ): Promise<any> {
    return await this.photosService.updatePhotos(createPhotosDtos, id);
  }

  @Delete(':id')
  async deletePhotossbyId(@Param('id') id: string): Promise<any> {
    return await this.photosService.deletePhotos({ _id: id });
  }
}
