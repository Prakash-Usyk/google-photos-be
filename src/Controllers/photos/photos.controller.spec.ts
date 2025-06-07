// photos.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { PhotossController } from './photos.controller';
import { PhotosService } from './photos.service';

describe('PhotossController', () => {
  let controller: PhotossController;
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotossController],
      providers: [
        {
          provide: PhotosService,
          useValue: {
            createPhotos: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PhotossController>(PhotossController);
    service = module.get<PhotosService>(PhotosService);
  });

  it('should call service and return response on photo upload', async () => {
    const mockFiles: Express.Multer.File[] = [
      { path: 'uploads/image1.jpg' } as Express.Multer.File,
      { path: 'uploads/image2.jpg' } as Express.Multer.File,
    ];

    const mockResponse = {
      type: 'success',
      data: {
        message: 'Photos Uploaded SucessFully',
        data: [],
      },
    };

    jest.spyOn(service, 'createPhotos').mockResolvedValue(mockResponse);

    const result = await controller.createPhotos(mockFiles, {} as any);
    expect(service.createPhotos).toHaveBeenCalledWith(mockFiles);
    expect(result).toEqual(mockResponse);
  });
});
