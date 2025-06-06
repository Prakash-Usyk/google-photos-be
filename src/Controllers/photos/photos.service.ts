import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { Photos } from 'src/models/photos';
import { DefaultMessage, ResponseStatus } from 'src/utils/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photos.name) private photosModel: Model<Photos>,
    @InjectModel(Photos.name) private photospagModel: PaginateModel<Photos>,
  ) {}

  async getAllPhotos(payload: {}, paginationQuery: {}): Promise<any> {
    try {
      const photos = await this.photospagModel.paginate(
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

  async createPhotos(files: any): Promise<any> {
    try {
      const photoDocs = files?.map((file) => {
        const path = file.path.replace(/\\/g, '/');
        return {
          image: path,
        };
      });

      const photosDocumentModel = await this.photosModel.insertMany(photoDocs);

      return {
        type: 'success',
        data: {
          data: photosDocumentModel,
          message: 'Photos Uploaded SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async getSinglePhotos(payload: any): Promise<any> {
    try {
      const photo = await this.photosModel.findOne(payload).exec();
      if (!photo) {
        throw new HttpException('Photo not found', ResponseStatus.NOT_FOUND);
      }
      return {
        type: 'success',
        data: {
          data: photo,
          message: 'Photo Retrieved SucessFully',
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch photo',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async updatePhotos(payload: any, id: string): Promise<any> {
    try {
      const updated = await this.photosModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
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
        error.message || 'Failed to update photo',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }

  async deletePhotos(payload: any): Promise<any> {
    try {
      const result = await this.photosModel.deleteOne(payload);
      if (result.deletedCount === 0) {
        throw new HttpException(
          'No photo found to delete',
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
        error.message || 'Failed to delete photo',
        ResponseStatus.INTERNAL_ERROR,
      );
    }
  }
}
