import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { Albums } from 'src/models/albums';
import { DefaultMessage, ResponseStatus } from 'src/utils/constants';
import { ConfigService } from '@nestjs/config';
import { AlbumPhotoMapping } from 'src/models/album_photo_mapping';
import { Types } from 'mongoose';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Albums.name) private albumModel: Model<Albums>,
    @InjectModel(Albums.name) private albumPagModel: PaginateModel<Albums>,

    @InjectModel(AlbumPhotoMapping.name)
    private albumPhotoModel: Model<AlbumPhotoMapping>,
    @InjectModel(AlbumPhotoMapping.name)
    private albumPhotoPagModel: PaginateModel<AlbumPhotoMapping>,
  ) {}

  async getAllalbum(payload: {}, paginationQuery: {}): Promise<any> {
    try {
      const photos = await this.albumPagModel.paginate(
        payload,
        paginationQuery,
      );
      const albumsWithThumbnails = await Promise.all(
        photos.docs.map(async (album) => {
          const thumbnailMapping = await this.albumPhotoModel
            .findOne({ album: album._id })
            .populate('photos')
            .sort({ _id: 1 });

          return {
            ...album.toObject(),
            thumbnail: thumbnailMapping?.photos || null,
          };
        }),
      );

      return {
        type: 'success',
        data: {
          data: albumsWithThumbnails,
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

  async createalbum(payload: any): Promise<any> {
    try {
      const photosDocumentModel = await this.albumModel.create(payload);

      if (payload?.images?.length > 0) {
        const obj = payload?.images?.map((x) => ({
          photos: new Types.ObjectId(x),
          album: photosDocumentModel?._id,
        }));

        await this.albumPhotoModel.create(obj);
      }

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

  async getSinglealbum(payload: any): Promise<any> {
    try {
      const Album = await this.albumModel.findOne(payload).exec();
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

  async updatealbum(payload: any, id: string): Promise<any> {
    try {
      const updated = await this.albumModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
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

  async deletealbum(payload: any): Promise<any> {
    try {
      const result = await this.albumModel.deleteOne(payload);
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
