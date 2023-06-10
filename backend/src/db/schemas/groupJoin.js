import { Schema, model } from 'mongoose';

const GroupJoinSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
