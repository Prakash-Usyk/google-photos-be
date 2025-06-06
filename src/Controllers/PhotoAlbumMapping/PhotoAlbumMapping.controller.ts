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
import { AlbumPhotoMapService } from './PhotoAlbumMapping.service';
import { CreatePhotoAlbumDto } from './PhotoAlbumMappingDto/album.dto';
import { filterPagination } from 'src/paginate/paginate';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Controller('album-photo-map')
export class AlbumPhotoMapController {
  constructor(private readonly albumsPhotoMapsService: AlbumPhotoMapService) {}

  async findalbumsPhotoMaps(payload): Promise<any> {
    return await this.albumsPhotoMapsService.getSinglealbumsPhotoMap(payload);
  }

  @Get()
  async getalbumsPhotoMap(@Query() params: {}): Promise<any> {
    const fields = ['album'];
    const filters = filterPagination(fields, params);
    return await this.albumsPhotoMapsService.getAllalbumsPhotoMap(
      filters?.payload,
      filters?.paginationQuery,
      params,
    );
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async createAlbum(@Body() createAlbumDto: CreatePhotoAlbumDto) {
    return await this.albumsPhotoMapsService.createalbumsPhotoMap(
      createAlbumDto,
    );
  }

  @Get(':id')
  async getalbumsPhotoMapbyId(@Param('id') id: string): Promise<any> {
    return await this.findalbumsPhotoMaps({ _id: id });
  }

  @Put(':id')
  async updatealbumsPhotoMapbyId(
    @Param('id') id: string,
    @Body() createAlbumDtos: CreatePhotoAlbumDto,
  ): Promise<any> {
    return await this.albumsPhotoMapsService.updatealbumsPhotoMap(
      createAlbumDtos,
      id,
    );
  }

  @Delete(':id')
  async deletealbumsPhotoMapbyId(@Param('id') id: string): Promise<any> {
    return await this.albumsPhotoMapsService.deletealbumsPhotoMap({ _id: id });
  }
}
