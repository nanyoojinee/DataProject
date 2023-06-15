import { GroupModel } from '../schemas/group.js';
import { ObjectId } from 'mongodb';

class Group {
  //그룹생성
  static async create({ newGroup }) {
    const createdNewGroup = await GroupModel.create(newGroup);
    return createdNewGroup;
  }

  // 그룹 중복 생성 확인
  static async findByGroupOwnerId(groupOwnerId) {
    const group = await GroupModel.findOne({ groupOwnerId });
    return group;
  }
  // 그룹 모집인원 확인 - 모집인원 이상 가입 제한용
  static async findTotNumOfMems(groupId) {
    const groupJoin = await GroupModel.findById({ _id: groupId });
    console.log('groupJoin', groupJoin);
    console.log('총몇명',groupJoin.totalNumOfMembers);
    return groupJoin; 
  }

  //그룹 상세조회
  static async findBygroupId(id) {
    const mygroup = await GroupModel.findById(id).populate('groupOwnerId');
    return mygroup;
  }

  // 그룹 목록 조회
  static async findAndCountAll(skip, limit) {
    const groups = await GroupModel.find()
      .populate('groupOwnerId')
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    const count = await GroupModel.countDocuments();
    return { groups, count };
  }

  //그룹명 검색
  static async findByTitle({ title }) {
    const search = await GroupModel.find({}).populate('groupOwnerId').sort({ _id: -1 }).exec();
    const filteredSearch = search.filter(group => group.title.includes(title.slice(0, -1)));
    const count = filteredSearch.length;
    return { groups: filteredSearch, count };
  }

  //대기자조회
  static async findBygroupIdAndState({ groupId, state }) {
    const groupJoinready = await GroupModel.find({
      groupId: groupId,
      state: '대기',
    });
    return groupJoinready;
  }

  static async update({ groupId }) {
    const filter = { _id: new ObjectId(groupId) };
    const update = { state: '승인' };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupModel.findOneAndUpdate(filter, update, option);
    return updatedGroup;
  }
  //그룹장이 그룹 삭제 시
  static async deleteById({ groupId }) {
    const deleteResult = await GroupModel.deleteOne({ _id: groupId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
  static async findAll() {
    const groups = await GroupModel.find();
    return groups;
  }
}

export { Group };
