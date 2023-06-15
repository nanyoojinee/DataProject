import { Group } from '../db/models/Group.js';
import { User } from '../db/models/User.js';
import { GroupJoin } from '../db/models/GroupJoin.js';

class groupService {
  // 그룹의 생성
  static async addGroup({
    groupOwnerId,
    title,
    totalNumOfMembers,
    description,
    createdAt,
    thumbnail,
  }) {
    const newGroup = {
      groupOwnerId,
      title,
      totalNumOfMembers,
      description,
      createdAt,
      thumbnail,
    };
    const createdGroup = await Group.create({ newGroup });
    return createdGroup;
  }

  // 그룹 중복 생성 방지용
  static async getGroupByOwnerId(groupOwnerId) {
    const group = await Group.findByGroupOwnerId(groupOwnerId);
    return group;
  }

  // 그룹의 목록 조회
  static async getGroups(page, limit) {
    const skip = (page - 1) * limit;
    const { groups, count } = await Group.findAndCountAll(skip, limit);
    return { groups, count };
  }

  // 그룹의 상세페이지 조회
  static async getMyGroup(groupId) {
    const myGroup = await Group.findBygroupId(groupId);
    return myGroup;
  }
  //그룹명 검색
  static async searchGroup({ title }) {
    const { groups: filteredSearch, count } = await Group.findByTitle({ title });
    if (!filteredSearch) {
      const errorMessage =
        '그룹명 조회: 해당 이름을 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }
    return { groups: filteredSearch, count };
  }
  //그룹 삭제
  static async deleteGroup({ groupId, userId }) {
    const isGroupDataDeleted = await Group.deleteById({ groupId });
    //그룹장의 groupId 삭제
    const deleteGroupOwnerGroupId = await User.deleteGroupId({ groupId, userId });
    //그룹멤버의 groupId 삭제
    const deleteGroupId = await User.deleteMembersGroupId({ groupId });
    // groupJoin 데이터 삭제
    const isGroupJoinDataDeleted = await GroupJoin.deleteData({ groupId });

    if (!deleteGroupOwnerGroupId) {
      const errorMessage =
        '그룹오너삭제: 해당 id를 가진 그룹장이 없습니다.';
      throw new Error(errorMessage);
    }
    if (!deleteGroupId) {
      const errorMessage =
        '멤버들 그룹아이디삭제: 해당 id를 가진 멤버가 없습니다.';
      throw new Error(errorMessage);
    }
    if (!isGroupJoinDataDeleted) {
      const errorMessage =
        '그룹조인데이터삭제: 해당 id를 가진 데이터가 없습니다.';
      throw new Error(errorMessage);
    }
    if (!isGroupDataDeleted) {
      const errorMessage = 'Group 삭제: 해당 id를 가진 그룹이 없습니다.';
      throw new Error(errorMessage);
    }
    return { status: 'ok' };
  }
}
export { groupService };
