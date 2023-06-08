import mongoose from 'mongoose';
import { User } from './models/User.js';
import { Group } from './models/Group.js';
import { GroupJoin } from './models/GroupJoin.js';
import { ActCategory } from './models/ActCategory.js';
import { Activity } from './models/Activity.js';

const DB_URL =
  process.env.MONGODB_URL ||
  5001('MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.');

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('아싸 MongoDB연결완료!  ' + DB_URL));
db.on('error', error =>
  console.error('MongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error),
);

export { User, Group, GroupJoin, ActCategory, Activity };
