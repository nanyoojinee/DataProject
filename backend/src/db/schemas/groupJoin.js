import { Schema, model } from 'mongoose';

const GroupJoinSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    loginedId: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { strictPopulate: false },
  {
    timestamps: true,
  },
);
const GroupJoinModel = model('GroupJoin', GroupJoinSchema);

export { GroupJoinModel };
