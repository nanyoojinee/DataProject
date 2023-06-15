import { GroupJoinModel } from '../schemas/groupJoin.js';
import { UserModel } from '../schemas/user.js';

class GroupJoin {
  static async create(newGroupJoin) {
    const createdNewGroupJoin = await GroupJoinModel.create(newGroupJoin);
    return createdNewGroupJoin;
  }

  static async findByUserId({ userId }) {
    const group = await GroupJoinModel.findOne({ userId });
    return group;
  }
  // 나의 그룹 조회
  static async findMyGroup({ userId }) {
    const group = await GroupJoinModel.find({ userId }).populate({
      path: 'groupId',
      populate: { path: 'groupOwnerId' },
    });
    return group;
  }

  // groupId로 찾기 
  static async findGroupMembers({groupId}) {
    const groupMembers = await GroupJoinModel.find({groupId});
    return groupMembers;
  }
  // 그룹 가입 승인 대기자 조회 - 관리자용
  static async findByGroupId({ groupId }) {
    const waitingList = await GroupJoinModel.find({ groupId: groupId, state: '대기' }).populate(
      'userId',
      'name nickname profileImg',
    );
    return waitingList;
  }

  static async findAll() {
    const groupAllInfo = await GroupJoinModel.find({});
    return groupAllInfo;
  }
  // 유저 가입 대기 -> 승인으로 관리자 승인에 의한 상태 변경 - 관리자용
  static async update({ groupId, userId }) {
    const filter = { groupId, userId, state: '대기' };
    const update = { $set: { state: '승인' } };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupJoinModel.findOneAndUpdate(filter, update, option);
    if (!updatedGroup) {
      return false;
    }
    return true;
  }

  // 유저 가입 대기 -> 거절로 관리자 거절에 의한 삭제
  static async deleteGroupJoinByIds({ groupId, userId }) {
    const deletedGroup = await GroupJoinModel.deleteOne({
      groupId,
      userId,
      state: '대기',
    });
    const isDataDeleted = deletedGroup.deletedCount === 1;
    return isDataDeleted;
  }

  // 유저의 그룹 탈퇴
  static async deleteByUserId({ userId }) {
    const deletedGroup = await GroupJoinModel.deleteOne({ userId });
    const isDataDeleted = deletedGroup.deletedCount === 1;
    return isDataDeleted;
  }
  // 그룹 삭제로 멤버들 모든 기록 삭제
  static async deleteData({groupId}) {
    const deletedGroup = await GroupJoinModel.deleteMany({ groupId });
    return deletedGroup;
  }
}

export { GroupJoin };
