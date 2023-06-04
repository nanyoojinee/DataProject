import { User } from '../db/index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class userAuthService {
  static async addUser({ inputId, password, name, nickname, phone, address }) {
    const user = await User.findByInputId({ inputId });
    if (user) {
      const errorMessage = '이 아이디는 현재 사용중입니다. 다른 아이디를 입력해 주세요.';
      return { errorMessage };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = uuidv4();
    const newUser = { id, inputId, password: hashedPassword, name, nickname, phone };

    return User.create({ newUser });
  }

  static async getUser({ inputId, password }) {
    const user = await User.findByInputId({ inputId });
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
    const token = jwt.sign({ userId: user.id }, secretKey);

    const { id, name, nickname, phone, address, profileImage } = user;

    const loginUser = {
      token,
      id,
      inputId,
      name,
      nickname,
      phone,
      address,
      profileImage,
      errorMessage: null,
    };
    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async setUser({ userId, toUpdate }) {
    let user = await User.findById({ userId });

    if (!user) {
      const errorMessage = 'User 조회: 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (toUpdate.inputId) {
      const fieldToUpdate = 'inputId';
      const newValue = toUpdate.inputId;
      await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = 'password';
      const newValue = await bcrypt.hash(toUpdate.password, 10);
      await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.name) {
      const fieldToUpdate = 'name';
      const newValue = toUpdate.name;
      await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.nickname) {
      const fieldToUpdate = 'nickname';
      const newValue = toUpdate.nickname;
      await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.phone) {
      const fieldToUpdate = 'phone';
      const newValue = toUpdate.phone;
      await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.address) {
      const fieldToUpdate = 'address';
      const newValue = toUpdate.address;
      await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.profileImage) {
      const fieldToUpdate = 'profileImage';
      const newValue = toUpdate.profileImage;
      await User.update({ userId, fieldToUpdate, newValue });
    }

    return user;
  }

  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    if (!user) {
      const errorMessage =
        'User 조회: 해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return user;
  }
}

export { userAuthService };
