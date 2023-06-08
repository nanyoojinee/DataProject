import { Schema, model } from 'mongoose';

const ActivitySchema = new Schema(
  {
    groupId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    usedDate: {
      type: Date,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    actCategoryId: {
      type: String,
      require: true,
    },
    proofImg: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
  },
);

const ActivityModel = model('Activity', ActivitySchema);
export { ActivityModel };
