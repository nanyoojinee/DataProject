import { UserModel } from '../schemas/user.js';

class User {
  // 회원가입
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  // 회원가입 체크
  static async findByDuplicateFields(fields) {
    const user = await UserModel.findOne({ $or: fields });
    return user;
  }

  // 회원가입(아이디 체크), 로그인
  static async findByUserId({ userId }) {
    const user = await UserModel.findOne({ userId });
    return user;
  }
  // 정보 수정, 유저 정보 조회
  static async findById({ loginedId }) {
    const user = await UserModel.findById(loginedId);
    return user;
  }
  // 유저 목록
  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  // 나의 그룹 조회
  static async findMyGroup({ userId }) {
    const group = await UserModel.find({ _id: userId }, 'groupId').populate({
      path: 'groupId',
      populate: { path: 'groupOwnerId' },
    });
    return group;
  }

  //방장이 그룹 가입 못하게 하기
  static async findGroupOwner({ userId }) {
    const user = await UserModel.findOne({ _id: userId });
    return user;
  }
  // groupId 같은 멤버 조회용
  static async findGroupMembers({ groupId }) {
    const foundMembers = await UserModel.find(
      { groupId },
      'userId name nickname phone profileImg groupId',
    );
    return foundMembers;
  }
  // 정보 수정
  static async update({ loginedId, fieldToUpdate, newValue }) {
    const filter = { _id: loginedId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  //유저가 그룹 가입 시, 그룹 생성 시  groupId 업데이트
  static async updateGroupId({ userId, groupId }) {
    const filter = { _id: userId };
    const update = { $set: { groupId: groupId } };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 유저의 groupId 삭제
  static async deleteGroupId({ groupId, userId }) {
    const filter = { groupId, _id: userId };
    const update = { $set: { groupId: null } };
    const option = { returnOriginal: false };

    const updatedGroup = await UserModel.findOneAndUpdate(filter, update, option);
    if (!updatedGroup) {
      return false;
    }
    return true;
  }
  //그룹 삭제 시 멤버의 groupId 삭제
  static async deleteMembersGroupId({ groupId }) {
    const filter = { groupId };
    const update = { $set: { groupId: null } };
    const option = { returnOriginal: false };

    const updatedGroup = await UserModel.updateMany(filter, update, option);
    console.log('updatedGroup', updatedGroup);
    if (!updatedGroup) {
      return false;
    }
    return true;
  }
}
export { User };
