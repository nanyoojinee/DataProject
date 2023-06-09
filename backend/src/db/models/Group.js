import { GroupModel } from '../schemas/group.js';

class Group {
  static async create({ newGroup }) {
    const createdNewGroup = await GroupModel.create(newGroup);
    return createdNewGroup;
  }

  static async findById({ groupId }) {
    const group = await GroupModel.findOne({ id: groupId });
    return group;
  }
  //그룹 상세조회
  static async findBygroupId(id) {
    const mygroup = await GroupModel.findOne({ id }).populate('groupJoin');
    return mygroup;
  }

  static async findAll() {
    const groupAllInfo = await GroupModel.find({});
    return groupAllInfo;
  }

  static async update({ groupId, fieldToUpdate, newValue }) {
    const filter = { id: groupId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupModel.findOneAndUpdate(filter, update, option);
    return updatedGroup;
  }

  static async deleteById({ id }) {
    const deleteResult = await GroupModel.deleteOne({ id });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Group };
