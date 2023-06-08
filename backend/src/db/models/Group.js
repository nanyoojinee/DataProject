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
//나의 그룹 상세조회
  static async findOne( groupId ) {
    const mygroup = await GroupModel.find({ _id: groupId }).populate('groupJoin');
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

  static async delete(groupId) {
    const deletedGroup = await GroupModel.deleteOne(groupId);
    return deletedGroup;
  }
}

export { Group };
