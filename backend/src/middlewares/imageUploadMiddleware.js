import fs from 'fs';
import multer from 'multer';
import path from 'path';

try {
  fs.readdirSync('uploads');
} catch (e) {
  console.error('upload 폴더가 없어서 uploads폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});
const limits = { fieldsize: 10 * 1024 * 1024 };
const filter = (req, file, callback) => {
  const fileType = file.mimetype.split('/')[1];

  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    callback({ message: 'jpg, jpeg, png 확장자만 가능합니다.' }, false);
  }
};

export const upload = multer({ storage: storage, limits: limits, fileFilter: filter });
