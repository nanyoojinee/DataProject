import { User } from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ActivityModel } from '../db/schemas/activity.js';

class userAuthService {
  // 회원가입
  static async addUser({
    userId,
    password,
    name,
    nickname,
    phone,
    address,
    addressDetail,
    groupId,
    profileImg,
  }) {
    const duplicateFields = [];
    const existingUser = await User.findByDuplicateFields([{ userId }, { nickname }, { phone }]);

    if (existingUser) {
      if (existingUser.userId === userId) {
        duplicateFields.push('userId');
      }

      if (existingUser.nickname === nickname) {
        duplicateFields.push('nickname');
      }

      if (existingUser.phone === phone) {
        duplicateFields.push('phone');
      }

      const errorMessage = `이미 사용 중인 ${duplicateFields.join(', ')} 입니다`;
      throw new Error(errorMessage);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      userId,
      password: hashedPassword,
      name,
      nickname,
      phone,
      address,
      addressDetail,
      groupId,
      profileImg,
    };

    return User.create({ newUser });
  }
  //로그인
  static async getUser({ userId, password }) {
    const user = await User.findByUserId({ userId });
    if (!user) {
      const errorMessage =
        'User 조회: 해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

    if (!isPasswordCorrect) {
      const errorMessage = 'User 조회: 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
    const token = jwt.sign({ id: user._id }, secretKey);

    const { id, name, nickname, phone, address, addressDetail, groupId, profileImg } = user;

    const loginUser = {
      token,
      id,
      userId,
      name,
      nickname,
      phone,
      address,
      addressDetail,
      groupId,
      errorMessage: null,
      profileImg,
    };
    return loginUser;
  }
  // 유저 목록
  static async getUsers() {
    const users = await User.findAll();
    return users;
  }
  // 정보 수정
  static async setUser({ loginedId, toUpdate }) {
    let user = await User.findById({ loginedId });

    if (!user) {
      const errorMessage = 'User 조회: 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }

    if (toUpdate.userId) {
      const errorMessage = 'userId는 변경할 수 없습니다.';
      throw new Error(errorMessage);
    }

    if (toUpdate.name) {
      const errorMessage = '이름은 변경할 수 없습니다.';
      throw new Error(errorMessage);
    }

    if (toUpdate.password) {
      const fieldToUpdate = 'password';
      const newValue = await bcrypt.hash(toUpdate.password, 10);
      await User.update({ loginedId, fieldToUpdate, newValue });
    }

    if (toUpdate.nickname) {
      const fieldToUpdate = 'nickname';
      const newValue = toUpdate.nickname;
      await User.update({ loginedId, fieldToUpdate, newValue });
    }

    if (toUpdate.phone) {
      const fieldToUpdate = 'phone';
      const newValue = toUpdate.phone;
      await User.update({ loginedId, fieldToUpdate, newValue });
    }

    if (toUpdate.address) {
      const fieldToUpdate = 'address';
      const newValue = toUpdate.address;
      await User.update({ loginedId, fieldToUpdate, newValue });
    }

    if (toUpdate.addressDetail) {
      const fieldToUpdate = 'addressDetail';
      const newValue = toUpdate.addressDetail;
      await User.update({ loginedId, fieldToUpdate, newValue });
    }

    if (toUpdate.profileImg) {
      const fieldToUpdate = 'profileImg';
      const newValue = toUpdate.profileImg;
      await User.update({ loginedId, fieldToUpdate, newValue });
    }

    return user;
  }

  // 나의 그룹 조회용
  static async getMyGroup({ userId }) {
    const group = await User.findMyGroup({ userId });
    return group;
  }

  // groupId 같은 멤버 조회
  static async getMembers({ groupId }) {
    const members = await User.findGroupMembers({ groupId });
    return members;
  }

  // 유저가 그룹에 가입신청 시 groupId값 업데이트
  static async setUserGroup({ userId, groupId }) {
    const updated = await User.updateGroupId({ userId, groupId });
    return updated;
  }

  // 유저의 groupId값 삭제
  static async deleteGroupId({ groupId, userId }) {
    const deleteGroupId = await User.deleteGroupId({ groupId, userId });
    return deleteGroupId;
  }
  // // 그룹 삭제 시 멤버의 groupId값 삭제
  // static async deleteMembersGroupId({ groupId }) {
  //   const deleteGroupId = await User.deleteMembersGroupId({ groupId });
  //   console.log('서비스쪽멤버user-groupId',deleteGroupId);
  //   return deleteGroupId;
  // }

  static async getUserActivityCount(userId, category) {
    const count = await ActivityModel.countDocuments({
      userId: userId,
      state: '승인',
      category: category,
    });

    return count;
  }
  // 유저 정보 조회
  static async getUserInfo({ loginedId }) {
    try {
      const user = await User.findById({ loginedId });

      if (!user) {
        const errorMessage =
          'User 조회: 해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
        throw new Error(errorMessage);
      }

      const tumblerCount = await userAuthService.getUserActivityCount(loginedId, 'tumbler');
      const multipleContainersCount = await userAuthService.getUserActivityCount(
        loginedId,
        'multipleContainers',
      );

      const totalCount = tumblerCount + multipleContainersCount;

      return { user, tumblerCount, multipleContainersCount, totalCount };
    } catch (error) {
      throw new Error('Failed to get user info.');
    }
  }
}
export { userAuthService };
