import { Activity } from '../db/models/Activity.js';

class activityService {
  //
  static async getAllActivity({ groupId, userId, name, usedDate, state, actCategoryId }) {
    const activityUser = {
      groupId,
      userId,
      name,
      usedDate,
      state,
      actCategoryId,
    };
    return activityUser;
  }
  static async addActivity() {}
  static async removeActivity() {}
}

export { activityService };
