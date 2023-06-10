import { atom } from 'recoil';

export const isPostcodeModalState = atom({
  key: 'isPostcodeModal',
  default: false,
});

export const postcodeAddressState = atom({
  key: 'postcodeAddress',
  default: '',
});

export const userTokenState = atom({
  key: 'userToken',
  default: '',
});

export const imgFileState = atom({
  key: 'imgFile',
  default: null,
});

export const userInfoState = atom({
  key: 'userInfo',
  default: [],
});

export const updateState = atom({
  key: 'update',
  default: 0,
});
