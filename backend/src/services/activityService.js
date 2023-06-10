import { Activity } from '../db/models/Activity.js';

class activityService {
  static async addActivity({ userId, groupId, state, name, usedDate, category, proofImg }) {
    const newActivity = {
      userId,
      groupId,
      state,
      name,
      usedDate,
      category,
      proofImg,
    };
    return Activity.create({ newActivity });
  }
  // static async addActivity() {}
  // static async removeActivity() {}
}

export { activityService };
