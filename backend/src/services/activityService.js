import { Activity } from '../db/models/Activity.js';
import { Group } from '../db/models/Group.js';

class activityService {
  // 활동 등록
  static async addActivity({ userId, groupId, state, name, usedDate, category, proofImg }) {
    const newActivity = {
      userId,
      groupId,
      state: '대기',
      name,
      usedDate,
      category,
      proofImg,
    };
    return Activity.create({ newActivity });
  }

  // 그룹 활동 조회
  static async getActivityInfo(groupId, year, month) {
    // 년도, 월에 해당하는 데이터 가져오기
    const activities = await Activity.find({
      groupId: groupId,
      state: '승인',
      usedDate: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    });

    function countActivity(activities, activityType) {
      return activities.reduce((count, activity) => {
        return activity.category === activityType ? count + 1 : count;
      }, 0);
    }

    const activityDataByDate = {};

    activities.forEach(activity => {
      const dateKey = activity.usedDate.toISOString().slice(0, 10); // 날짜 포맷 변경
      if (!activityDataByDate[dateKey]) {
        activityDataByDate[dateKey] = {
          date: dateKey,
          tumbler: 0,
          multipleContainers: 0,
          members: [],
        };
      }

      activityDataByDate[dateKey].tumbler += countActivity([activity], 'tumbler');
      activityDataByDate[dateKey].multipleContainers += countActivity(
        [activity],
        'multipleContainers',
      );

      const member = {
        userId: activity.userId._id,
        name: activity.userId.name,
        nickname: activity.userId.nickname,
        profileImg: activity.userId.profileImg,
      };

      console.log(member);

      const existingMember = activityDataByDate[dateKey].members.find(
        existing => existing.userId === member.userId,
      );
      if (!existingMember) {
        activityDataByDate[dateKey].members.push(member);
      }
    });

    const activityData = Object.values(activityDataByDate);

    return activityData;
  }

  // 그룹 활동 월별 총합
  static async getActivityCount(groupId, year, month) {
    // 년도, 월에 해당하는 데이터 가져오기
    const activities = await Activity.find({
      groupId: groupId,
      state: '승인',
      usedDate: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    });

    const activityCount = {
      tumbler: 0,
      multipleContainers: 0,
    };

    for (const activity of activities) {
      const { category } = activity;
      activityCount[category]++;
    }

    return activityCount;
  }

  // 활동 신청 승인 대기 조회
  static async getWaitingList({ groupId }) {
    const waitingList = await Activity.findByGroupId({ groupId });
    return waitingList;
  }

  // 활동 신청 승인 수락
  static async setActivity(activityId) {
    try {
      const activity = await Activity.findById(activityId);

      if (!activity) {
        return false;
      }

      activity.state = '승인';

      await activity.save();

      return true;
    } catch (error) {
      throw error;
    }
  }

  // 활동 신청 승인 거절
  static async deleteActivity(activityId) {
    try {
      const isDataDeleted = await Activity.deleteById(activityId);

      return { status: '활동 거절 완료' };
    } catch (error) {
      throw error;
    }
  }

  // 그룹 탈퇴 시 활동 삭제
  static async deleteUserActivity({ userId }) {
    const isDataDeleted = await Activity.deleteByUserId({ userId });

    if (!isDataDeleted) {
      const errorMessage = 'Activity 삭제: 해당 user의 활동이 없습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }
    return { status: 'ok' };
  }

  // 유저 활동 목록 조회
  static async getActivities(userId, skip, limit) {
    try {
      const { activities, count } = await Activity.findByUserId(userId, skip, limit);
      return { activities, count };
    } catch (error) {
      throw error;
    }
  }

  // 그룹 활동 랭킹
  static async getTotalCounts() {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const groups = await Group.findAll();
    const totalCountsByGroup = {};

    for (const group of groups) {
      const groupId = group._id;
      const totalCount = await Activity.getActivityCountBygroupId(
        groupId,
        startOfMonth,
        endOfMonth,
      );
      totalCountsByGroup[groupId] = totalCount;
    }

    const sortedTotalCounts = Object.entries(totalCountsByGroup)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    let currentRank = 1;
    const rankedTotalCounts = [];

    for (const [groupId, count] of sortedTotalCounts) {
      const group = await Group.findBygroupId(groupId);
      const { title, thumbnail } = group;

      rankedTotalCounts.push({
        rank: currentRank,
        groupId,
        count,
        title,
        thumbnail,
      });

      currentRank++;
    }

    return rankedTotalCounts;
  }
}

export { activityService };
