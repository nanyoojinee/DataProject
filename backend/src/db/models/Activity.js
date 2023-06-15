import { ActivityModel } from '../schemas/activity.js';

class Activity {
  // 활동 등록
  static async create({ newActivity }) {
    const createdNewActivity = await ActivityModel.create(newActivity);
    return createdNewActivity;
  }

  // 활동 신청 승인 수락
  static async findById({ activityId }) {
    const activity = await ActivityModel.findOne({ _id: activityId });
    return activity;
  }

  // 그룹 활동 조회
  static async find(conditions) {
    const activities = await ActivityModel.find(conditions).populate('userId');
    return activities;
  }

  // 활동 신청 승인 대기 조회
  static async findByGroupId({ groupId }) {
    const waitingList = await ActivityModel.find({ groupId: groupId, state: '대기' }).populate(
      'userId',
      'name nickname profileImg',
    );
    waitingList.forEach(activity => {
      if (!activity.usedDate || isNaN(activity.usedDate.valueOf())) {
        throw new Error(`Invalid usedDate value for activity: ${activity._id}`);
      }
    });

    return waitingList;
  }

  // 활동 신청 승인 거절
  static async deleteById({ activityId }) {
    const activity = await ActivityModel.deleteOne({ _id: activityId });
    return activity;
  }

  // 그룹 탈퇴 시 활동 삭제
  static async deleteByUserId({ userId }) {
    const activity = await ActivityModel.deleteMany({ userId });
    return activity;
  }

  // 유저 활동 목록 조회
  static async findByUserId(userId, skip, limit) {
    const activities = await ActivityModel.find({ userId, state: '승인' })
      .sort({ usedDate: -1 })
      .select('usedDate category')
      .skip(skip)
      .limit(limit);

    const count = await ActivityModel.countDocuments({ userId, state: '승인' });

    return { activities, count };
  }

  // 그룹 랭킹
  static async getActivityCountBygroupId(groupId, startOfMonth, endOfMonth) {
    const totalCount = await ActivityModel.countDocuments({
      groupId,
      usedDate: { $gte: startOfMonth, $lte: endOfMonth },
    });
    return totalCount;
  }
}

export { Activity };
