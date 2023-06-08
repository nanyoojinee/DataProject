import { Group } from '../db/models/Group.js';
import { GroupJoin } from '../db/models/GroupJoin.js';

class groupService {
  // create/ post
  static async addGroup({ groupOwner, title, totalNumOfMembers, description, members, thumbnail }) {
    const newGroup = {
      groupOwner: user.id,
      title,
      totalNumOfMembers,
      description,
      members,
      thumbnail,
    };
    const createdGroup = await Group.create({ newGroup });
    return createdGroup;
  }

  static async getGroups() {
    const Groups = await Group.findAll();
    return Groups;
  }

  static async getMyGroup() {
    const MyGroup = await Group.findOne();
    return MyGroup;
  }
}

export { groupService };
