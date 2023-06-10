import { Group } from '../db/models/Group.js';

class groupService {
  // 그룹의 생성
  static async addGroup({
    groupOwnerId,
    title,
    totalNumOfMembers,
    members,
    description,
    thumbnail,
  }) {
    const newGroup = {
      groupOwnerId,
      title,
      totalNumOfMembers,
      description,
      members,
      thumbnail,
    };
    const createdGroup = await Group.create({ newGroup });
    return createdGroup;
  }

  //그룹의 목록 조회
  static async getGroups() {
    const groups = await Group.findGroupList();
    return groups;
  }

  // 그룹의 상세페이지 조회
  static async getMyGroup(groupId) {
    const myGroup = await Group.findBygroupId(groupId);
    return myGroup;
  }

  // 그룹 가입 대기자 조회
  static async getWaiting({ groupId, state }) {
    const waitingList = await Group.findBygroupIdAndState({ groupId, state });
    return waitingList;
  }

  // 유저 가입 대기 -> 승인으로 관리자 승인에 의한 상태 변경
  static async setJoinedGroup({ loginedId }) {
    const updatedGroup = await Group.update({ loginedId });
    return updatedGroup;
  }

  //그룹 삭제
  static async deleteGroup({ groupId }) {
    const isDataDeleted = await Group.deleteById({ groupId });

    if (!isDataDeleted) {
      const errorMessage = 'Group 삭제: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return { status: 'ok' };
  }
}
export { groupService };
