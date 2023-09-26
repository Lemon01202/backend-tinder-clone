import { diskStorage } from 'multer';
import { extname } from 'path';
import { ROUNDING_TO } from '../mok/upload.mok';
export const STORAGE_DESTINATION = './uploads';

export const generateRandomName = () => {
  return Array(32)
    .join(Math.random().toString(36) + ROUNDING_TO)
    .slice(2, 10 + 2);
};

export const generateStorageConfiguration = () => {
  return diskStorage({
    destination: STORAGE_DESTINATION,
    filename: (req, file, cb) => {
      const randomName = generateRandomName();
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  });
};
