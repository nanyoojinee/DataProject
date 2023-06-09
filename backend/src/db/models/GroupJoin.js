import { GroupJoinModel } from '../schemas/groupJoin.js';

class GroupJoin {
  static async create({ newGroupJoin }) {
    const createdNewGroupJoin = await GroupJoinModel.create(newGroupJoin);
    return createdNewGroupJoin;
  }

  static async findById({ groupId }) {
    const group = await GroupJoinModel.findOne({ groupId });
    return group;
  }

  static async findByUserId({ userId }) {
    const group = await GroupJoinModel.findOne({ userId });
    return group;
  }

  static async findAll() {
    const groupAllInfo = await GroupJoinModel.find({});
    return groupAllInfo;
  }

  static async update({ groupId, fieldToUpdate, newValue }) {
    const filter = { id: groupId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupJoinModel.findOneAndUpdate(filter, update, option);
    return updatedGroup;
  }

  static async deleteByLoginedId({ loginedId }) {
    const deletedGroup = await GroupJoinModel.deleteOne({ id: loginedId });
    const isDataDeleted = deletedGroup.deletedCount === 1;
    return isDataDeleted;
  }
}

export { GroupJoin };
