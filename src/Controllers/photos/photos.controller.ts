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
    const getphotos = await this.photosService.getSinglePhotos(payload);
    if (!getphotos) {
      throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
    }
    return getphotos;
  }

  @Get()
  async getPhotoss(@Query() params: {}): Promise<any> {
    console.log(params);
    let fields = ['name', 'email'];
    const filters = await filterPagination(fields, params);
    const photoss = await this.photosService.getAllPhotos(
      filters?.payload,
      filters?.paginationQuery,
    );

    return {
      type: 'success',
      data: {
        data: photoss.docs,
        total_records: photoss.totalDocs,
        total_pages: photoss.totalPages,
        current_page: photoss.page,
      },
    };
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async createPhotos(
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() createPhotosDto: CreatePhotoDto,
  ) {
    console.log('Uploaded files:', files.image);
    console.log('Additional data:', createPhotosDto);

    return this.photosService.createPhotos(files);
  }

  @Get(':id')
  async getPhotossbyId(@Param('id') id: string): Promise<any> {
    const photos = await this.findphotos({ _id: id });
    return photos;
  }

  @Put(':id')
  async updatePhotossbyId(
    @Param('id') id: string,
    @Body() createPhotosDtos: CreatePhotoDto,
  ): Promise<any> {
    // const photos = await this.findphotos({ _id: id });
    const update = await this.photosService.updatePhotos(createPhotosDtos, id);
    return update;
  }

  @Delete(':id')
  async deletePhotossbyId(@Param('id') id: string): Promise<any> {
    // const photos = await this.findphotos({ _id: id });
    const delet = await this.photosService.deletePhotos({ _id: id });
    return {
      type: 'success',
      data: { message: 'Photos Deleted Succesfully' },
    };
  }
}
