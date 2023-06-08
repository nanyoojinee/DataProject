import { Activity } from '../db/models/Activity.js';

class activityService {
  // create/ post
  static async getAllActivity({
    groupId,
    userId,
    name,
    usedDate,
    state,
    actCategoryId,
    profileImg,
  }) {
    const activityUser = {
      groupId,
      userId,
      name,
      usedDate,
      state,
      actCategoryId,
      profileImg,
    };
    return activityUser;
  }
  static async addActivity() {}
  static async removeActivity() {}
}

export { activityService };
