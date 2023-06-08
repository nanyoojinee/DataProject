import { GroupJoinModel } from '../schemas/groupJoin.js';

class GroupJoin {
  static async create({ newGroupJoin }) {
    const createdNewGroupJoin = await GroupJoinModel.create(newGroupJoin);
    return createdNewGroupJoin;
  }


  static async findById({ groupId }) {
    const group = await GroupJoinModel.findOne({ id: groupId });
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

  static async delete(groupId) {
    const deletedGroup = await GroupJoinModel.deleteOne(groupId);
    return deletedGroup;
  }
}

export { GroupJoin };
