import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './photoDto/photo.dto';
import { filterPagination } from 'src/paginate/paginate';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Controller('photos')
export class PhotossController {
  constructor(private readonly photosService: PhotosService) {}

  async findphotos(payload): Promise<any> {
    return await this.photosService.getSinglePhotos(payload);
  }

  @Get()
  async getPhotoss(@Query() params: any): Promise<any> {
    const fields = ['image'];
    const filters = filterPagination(fields, params);
    return await this.photosService.getAllPhotos(
      filters?.payload,
      filters?.paginationQuery,
      params,
    );
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async createPhotos(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPhotosDto: CreatePhotoDto,
  ) {
    return await this.photosService.createPhotos(files);
  }

  @Get(':id')
  async getPhotossbyId(@Param('id') id: string): Promise<any> {
    return await this.findphotos({ _id: id });
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
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
