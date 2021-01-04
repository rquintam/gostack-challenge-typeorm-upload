import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const dateUpload = Date.now();
      const fileName = `${dateUpload}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
