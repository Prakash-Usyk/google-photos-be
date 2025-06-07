import { Test, TestingModule } from '@nestjs/testing';
import { PhotosService } from './photos.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PhotosService', () => {
  let service: PhotosService;
  let model: any;

  beforeEach(async () => {
    const mockModel = {
      insertMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotosService,
        {
          provide: getModelToken('Photo'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
    model = module.get(getModelToken('Photo'));
  });

  it('should create photo documents and return success response', async () => {
    const mockFiles = [
      { path: 'uploads\\img1.jpg' },
      { path: 'uploads\\img2.jpg' },
    ];

    const mockDocs = [
      { image: 'uploads/img1.jpg' },
      { image: 'uploads/img2.jpg' },
    ];

    model.insertMany.mockResolvedValue(mockDocs);

    const result = await service.createPhotos(mockFiles);

    expect(model.insertMany).toHaveBeenCalledWith([
      { image: 'uploads/img1.jpg' },
      { image: 'uploads/img2.jpg' },
    ]);
    expect(result).toEqual({
      type: 'success',
      data: {
        data: mockDocs,
        message: 'Photos Uploaded SucessFully',
      },
    });
  });

  it('should throw HttpException on error', async () => {
    model.insertMany.mockRejectedValue(new Error('DB Error'));

    await expect(service.createPhotos([])).rejects.toThrow('DB Error');
  });
});
