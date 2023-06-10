import { User } from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ActivityModel } from '../db/schemas/activity.js';

class userAuthService {
  static async addUser({
    userId,
    password,
    name,
    nickname,
    phone,
    address,
    addressDetail,
    profileImg,
  }) {
    const user = await User.findByUserId({ userId });
    if (user) {
      const errorMessage = '이 아이디는 현재 사용중입니다. 다른 아이디를 입력해 주세요.';
      return { errorMessage };
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
      profileImg,
    };

    return User.create({ newUser });
  }

  static async getUser({ userId, password }) {
    const user = await User.findByUserId({ userId });
    if (!user) {
      const errorMessage =
        'User 조회: 해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

    if (!isPasswordCorrect) {
      const errorMessage = 'User 조회: 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
    const token = jwt.sign({ id: user._id }, secretKey);

    const { id, name, nickname, phone, address, addressDetail, profileImg } = user;

    const loginUser = {
      token,
      id,
      userId,
      name,
      nickname,
      phone,
      address,
      addressDetail,
      profileImg,
      errorMessage: null,
    };
    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async setUser({ loginedId, toUpdate }) {
    let user = await User.findById({ loginedId });

    if (!user) {
      const errorMessage = 'User 조회: 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (toUpdate.userId) {
      const errorMessage = 'userId는 변경할 수 없습니다.';
      return { errorMessage };
    }

    if (toUpdate.name) {
      const errorMessage = '이름은 변경할 수 없습니다.';
      return { errorMessage };
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

  static async getUserActivityCount(userId, category) {
    const count = await ActivityModel.countDocuments({
      userId: userId,
      state: '승인',
      category: category,
    });

    return count;
  }

  static async getUserInfo({ loginedId }) {
    const user = await User.findById({ loginedId });

    if (!user) {
      const errorMessage =
        'User 조회: 해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const tumblerCount = await userAuthService.getUserActivityCount(loginedId, 'tumbler');
    const multipleContainersCount = await userAuthService.getUserActivityCount(
      loginedId,
      'multipleContainers',
    );

    const totalCount = tumblerCount + multipleContainersCount;

    return { user, tumblerCount, multipleContainersCount, totalCount };
  }
  catch(error) {
    throw new Error('Failed to get user info.');
  }
}

export { userAuthService };
