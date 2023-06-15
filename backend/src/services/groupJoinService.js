import { GroupJoin } from '../db/models/GroupJoin.js';
import { User } from '../db/models/User.js';
import { Group } from '../db/models/Group.js';

class groupJoinService {
  // 유저의 그룹 가입
  static async groupJoin({ groupId, userId, state }) {
    // 모집인원 다 찼을 때 가입 방지
    //그룹의 총 인원 검색
    const totMembers = await Group.findTotNumOfMems(groupId);
    const totalNums = totMembers.totalNumOfMembers;
    //그룹가입 인원 배열의 갯수
    const members = await User.findGroupMembers({ groupId });
    const membersCount = members.length;

    //그룹조인 테이블에서 해당 그룹Id를 가진 데이터수
    const groupJoinData = await GroupJoin.findGroupMembers({ groupId });
    const groupJoinDataCount = groupJoinData.length;
    console.log(
      '총인원:',
      totalNums,
      '현재인원:',
      membersCount,
      'groupJoin 총 인원:',
      groupJoinDataCount,
    );

    //같으면 err  -> 그룹원 모집 마감
    if (totalNums == membersCount || totalNums == groupJoinDataCount + 1) {
      const errorMessage = '모집인원이 마감되었습니다ㅜㅜ';
      throw new Error(errorMessage);
    }

    // 그룹장이 다른 그룹 가입 방지
    const user = await User.findGroupOwner({ userId });
    if (user.groupId) {
      const errorMessage = '그룹장이 아니신가요? 그룹은 하나만 가입할 수 있어요.';
      throw new Error(errorMessage);
    }
    const newGroupJoin = {
      groupId,
      userId,
      state,
    };
    const groupJoin = await GroupJoin.create(newGroupJoin);
    return groupJoin;
  }
  // 그룹 가입 시 중복가입 방지 조회용
  static async getJoinedGroup({ userId }) {
    const group = await GroupJoin.findByUserId({ userId });
    return group;
  }

  // 그룹 가입 대기자 리스트 - 관리자용
  static async getWaitingList({ groupId }) {
    const waitingList = await GroupJoin.findByGroupId({ groupId });
    return waitingList;
  }

  // 유저 가입 대기 -> 승인으로 관리자 승인에 의한 상태 변경
  static async setJoinedGroup({ groupId, userId }) {
    const approvalList = await GroupJoin.update({ groupId, userId });
    return approvalList;
  }

  //유저 가입 대기 -> 거절로 관리자 거절에 의한 삭제
  static async deletedGroupJoinByOwner({ groupId, userId }) {
    const isDataDeleted = await GroupJoin.deleteGroupJoinByIds({ groupId, userId });

    if (!isDataDeleted) {
      const errorMessage =
        '그룹거절오류: 해당 id를 가진 사용자가 없습니다. 아이디와 가입상태를 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }
    return { status: '가입거절완료' };
  }

  // 유저의 그룹 탈퇴
  static async deleteMyGroup({ userId }) {
    const isDataDeleted = await GroupJoin.deleteByUserId({ userId });

    if (!isDataDeleted) {
      const errorMessage = 'Group 탈퇴: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }
    return { status: 'ok' };
  }
  // 그룹 삭제로 모든 가입 멤버 데이터삭제
  static async deleteData(groupId) {
    console.log('groupId', groupId);
    const isDataDeleted = await GroupJoin.deleteData(groupId);
    console.log('isGroupDataDeleted', isDataDeleted);

    // if (!isDataDeleted) {
    //   const errorMessage =
    //     '그룹조인데이터삭제: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
    //   throw new Error(errorMessage);
    // }
    return { status: 'ok' };
  }
}

export { groupJoinService };
