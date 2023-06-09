import { GroupJoin } from '../db/models/GroupJoin.js';
import { User } from '../db/models/User.js';
import { Group } from '../db/models/Group.js';

class groupJoinService {
  // 유저의 그룹 가입
  static async groupJoin({ groupId, loginedId, state }) {
    const newGroupJoin = {
      groupId,
      loginedId,
      state,
    };

    const groupJoins = await GroupJoin.create({ newGroupJoin });
    return groupJoins;
  }

  static async getUserGroup({ loginedId }) {
    const group = await GroupJoin.findByUserId({ loginedId });
    return group;
  }

  // 유저의 그룹 탈퇴
  static async deleteJoinedGroup({ loginedId }) {
    const isDataDeleted = await GroupJoin.deleteByLoginedId({ loginedId });

    if (!isDataDeleted) {
      const errorMessage = 'Group 탈퇴: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return { status: 'ok' };
  }
}

export { groupJoinService };
