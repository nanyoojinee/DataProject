import { GroupJoin } from '../db/models/GroupJoin.js';
import { User } from '../db/models/User.js';
import { Group } from '../db/models/Group.js';

class groupJoinService {
  // 유저의 그룹 가입 - 완
  static async groupJoin({ groupId, userId, state }) {
    const group = await Group.findById({ groupId });
    const user = await User.findById({ userId });
    const newGroupJoin = {
      groupId,
      userId,
      state,
    };

    //console.log('444', newGroupJoin);
    const groupJoin = await GroupJoin.create(newGroupJoin);
    //console.log('234', groupJoin);
    return groupJoin;
  }

  static async getUserGroup({ userId }) {
    const group = await GroupJoin.findByUserId({ userId });
    return group;
  }
//유저가 가입한 그룹 확인 -완
  static async getMyGroup() {
    const group = await GroupJoin.findMyGroup();
    return group;
  }
// 그룹 가입 대기자 리스트 - 관리자용
  static async getWaitingList({groupId}) {
    const waitingList = await GroupJoin.findByGroupId({groupId}); 
    console.log('되냐',waitingList);
    return waitingList;
  }


  // 이거 잘못된게. 승인으로 변경해주는 건 관리자만 할 수 있음
  // 유저 가입 대기 -> 승인으로 관리자 승인에 의한 상태 변경
  // static async setJoinedGroup({ loginedId }) {
  //   const updatedGroup = await GroupJoin.update({ loginedId });
  //   return updatedGroup;
  // }

  // 유저의 그룹 탈퇴 - 완
  static async deleteMyGroup({ userId }) {
    const isDataDeleted = await GroupJoin.deleteByUserId({ userId });

    if (!isDataDeleted) {
      const errorMessage = 'Group 탈퇴: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return { status: 'ok' };
  }
}

export { groupJoinService };
