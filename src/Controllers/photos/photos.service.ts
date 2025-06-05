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
    private configservice: ConfigService,
  ) {}

  async getAllPhotos(payload: {}, paginationQuery: {}): Promise<any> {
    console.log(payload, paginationQuery, 'wueryyy');
    const photos = this.photospagModel.paginate(payload, paginationQuery);
    return photos;
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

      return photosDocumentModel;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? ResponseStatus.BAD_REQUEST,
      );
    }
  }

  getSinglePhotos(payload): any {
    return this.photosModel.findOne(payload).exec();
  }

  updatePhotos(payload: {}, id: string): any {
    return this.photosModel.findByIdAndUpdate({ _id: id }, payload);
  }

  deletePhotos(payload: {}): any {
    return this.photosModel.deleteOne(payload);
  }
}
