import { Schema, model } from 'mongoose';

const GroupSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    groupOwnerId: {
      type: String,
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
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'GroupJoin',
        required: false,
      },
    ],
    thumbnail: { type: String },
  },
  { strictPopulate: false },
  {
    timestamps: true,
  },
);
const GroupModel = model('Group', GroupSchema);

export { GroupModel };
