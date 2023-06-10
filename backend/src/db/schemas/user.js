import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    addressDetail: {
      type: String,
    },
    groupId: {
      type: String,
    },
    profileImg: {
      type: String,
    },
  },
  { strictPopulate: false },
  {
    timestamps: true,
  },
);

const UserModel = model('User', userSchema);

export { UserModel };
