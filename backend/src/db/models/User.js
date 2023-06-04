import { UserModel } from '../schemas/user.js';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByInputId({ inputId }) {
    const user = await UserModel.findOne({ inputId });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

export { User };
