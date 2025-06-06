import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { ResponseStatus } from 'src/utils/constants';
import { AlbumPhotoMapping } from 'src/models/album_photo_mapping';

@Injectable()
export class AlbumPhotoMapService {
  constructor(
    @InjectModel(AlbumPhotoMapping.name)
    private albumsPhotoMapModel: Model<AlbumPhotoMapping>,
    @InjectModel(AlbumPhotoMapping.name)
    private albumsPhotoMapPagModel: PaginateModel<AlbumPhotoMapping>,
  ) {}

  async getAllalbumsPhotoMap(payload: {}, paginationQuery: {}): Promise<any> {
    try {
      const photos = await this.albumsPhotoMapPagModel.paginate(
        payload,
        paginationQuery,
      );
      return {
        type: 'success',
        data: {
          data: photos.docs,
          total_records: photos.totalDocs,
          total_pages: photos.totalPages,
          current_page: photos.page,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async createalbumsPhotoMap(payload: any): Promise<any> {
    try {
      const photosDocumentModel =
        await this.albumsPhotoMapModel.create(payload);

      return {
        type: 'success',
        data: {
          data: photosDocumentModel,
          message: 'Album Uploaded SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async getSinglealbumsPhotoMap(payload: any): Promise<any> {
    try {
      const Album = await this.albumsPhotoMapModel.findOne(payload).exec();
      if (!Album) {
        throw new HttpException('Album not found', ResponseStatus.NOT_FOUND);
      }
      return {
        type: 'success',
        data: {
          data: Album,
          message: 'Album Retrieved SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch Album',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async updatealbumsPhotoMap(payload: any, id: string): Promise<any> {
    try {
      const updated = await this.albumsPhotoMapModel.findByIdAndUpdate(
        id,
        payload,
        {
          new: true,
        },
      );
      if (!updated) {
        throw new HttpException(
          'Album not found for update',
          ResponseStatus.NOT_FOUND,
        );
      }
      return {
        type: 'success',
        data: {
          data: updated,
          message: 'Album Updated SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update Album',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async deletealbumsPhotoMap(payload: any): Promise<any> {
    try {
      const result = await this.albumsPhotoMapModel.deleteOne(payload);
      if (result.deletedCount === 0) {
        throw new HttpException(
          'No Album found to delete',
          ResponseStatus.NOT_FOUND,
        );
      }
      return {
        type: 'success',
        data: {
          data: result,
          message: 'Album Deleted SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete Album',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }
}
