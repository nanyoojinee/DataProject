import { Schema, model } from 'mongoose';

const GroupSchema = new Schema(
  {
    groupOwner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalNumOfMembers: {
      type: Number,
      required: true,
    },
    members: {
      type: Schema.Types.ObjectId,
      ref: 'groupJoin',
      required:false,
    },
    thumbnail: { type: String },
  },
  { strictPopulate: false },
  {
    timestamps: true,
  },
);
const GroupModel = model('Group', GroupSchema);

export { GroupModel };
