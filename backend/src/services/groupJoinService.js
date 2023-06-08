import { GroupJoin } from '../db/models/GroupJoin.js';
import { User } from '../db/models/User.js';
import { Group } from '../db/models/Group.js';

class groupJoinService {
  // 그룹가입/ post
  static async addGroupJoin({ groupId, loginedId, state }) {
    const group = await Group.findOne({ _id: groupId }).select('_id');
    const user = await User.findOne({ id: loginedId }).select('_id');
    
    const newGroupJoin = {
      groupId: group._id,
      loginedId: user._id,
      state,
    };
    const createdGroupJoin = await GroupJoin.create(newGroupJoin);
    return createdGroupJoin;
  }
}

export { groupJoinService };
