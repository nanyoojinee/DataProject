import { Group } from '../db/models/Group.js';
import { GroupJoin } from '../db/models/GroupJoin.js';
import { v4 as uuidv4 } from "uuid";

class groupService {
  // create/ post
  static async addGroup({ groupOwner, title, totalNumOfMembers, description, thumbnail }) {
    const id = uuidv4();
    const newGroup = {
      id,
      groupOwner,
      title,
      totalNumOfMembers,
      description,
      thumbnail,
    };
    const createdGroup = await Group.create({ newGroup });
    return createdGroup;
  }
//그룹의 목록 조회
  static async getGroups() {
    const groups = await Group.findAll();
    return groups;
  }

  static async groupJoin({ groupId, userId, state }) {
    const newGroupJoin = {
      groupId,
      userId,
      state,
    };

    const groupJoins = await GroupJoin.create({ newGroupJoin });
    return groupJoins;
  }

  static async getUserGroup({ userId }) {
    const group = await GroupJoin.findByUserId({ userId });
    return group;
  }
// 그룹의 상세페이지 조회
  static async getMyGroup(groupId) {
    const myGroup = await Group.findBygroupId(groupId);
    return myGroup;
  }

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
