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

  async getAllalbumsPhotoMap(
    payload: {},
    paginationQuery: {},
    params,
  ): Promise<any> {
    try {
      if (params?.album_id) {
        payload = {
          ...payload,
          album: params?.album_id,
        };
      }
      const photos = await this.albumsPhotoMapPagModel.paginate(payload, {
        ...paginationQuery,
        populate: [{ path: 'album' }, { path: 'photos' }],
      });
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
          message: 'Photo Uploaded SucessFully',
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
      const Photo = await this.albumsPhotoMapModel.findOne(payload).exec();
      if (!Photo) {
        throw new HttpException('Photo not found', ResponseStatus.NOT_FOUND);
      }
      return {
        type: 'success',
        data: {
          data: Photo,
          message: 'Photo Retrieved SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch Photo',
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
          'Photo not found for update',
          ResponseStatus.NOT_FOUND,
        );
      }
      return {
        type: 'success',
        data: {
          data: updated,
          message: 'Photo Updated SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update Photo',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async deletealbumsPhotoMap(payload: any): Promise<any> {
    try {
      const result = await this.albumsPhotoMapModel.deleteOne(payload);
      if (result.deletedCount === 0) {
        throw new HttpException(
          'No Photo found to delete',
          ResponseStatus.NOT_FOUND,
        );
      }
      return {
        type: 'success',
        data: {
          data: result,
          message: 'Photo Deleted SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete Photo',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }
}
