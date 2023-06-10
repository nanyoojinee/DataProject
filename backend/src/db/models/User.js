import { UserModel } from '../schemas/user.js';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByUserId({ userId }) {
    const user = await UserModel.findOne({ userId });
    return user;
  }
  //유저의 그룹 가입
  static async findById({ loginedId }) {
    const user = await UserModel.findById(loginedId);
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ loginedId, fieldToUpdate, newValue }) {
    const filter = { _id: loginedId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

export { User };
