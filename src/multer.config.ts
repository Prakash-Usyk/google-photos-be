import { diskStorage } from 'multer';
import * as path from 'path';

export const multerConfig = {
  dest: './google_photos_uploads',
  storage: diskStorage({
    destination: './google_photos_uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
      callback(null, fileName);
    },
  }),
};
