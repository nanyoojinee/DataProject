import { ActivityModel } from '../schemas/activity.js';

class Activity {
  static async create({ newActivity }) {
    const createdNewActivity = await ActivityModel.create(newActivity);
    return createdNewActivity;
  }

  static async findById({ activityId }) {
    const activity = await ActivityModel.findOne({ id: activityId });
    return activity;
  }

  static async findByUserId({ userId }) {
    const activity = await ActivityModel.find({ userId });
    return activity;
  }

  static async update({ activityId, fieldToUpdate, newValue }) {
    const filter = { id: activityId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedActivity = await ActivityModel.findOneAndUpdate(filter, update, option);
    return updatedActivity;
  }

  static async deleteById({ activityId }) {
    const deleteResult = await ActivityModel.deleteOne({ id: activityId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Activity };
