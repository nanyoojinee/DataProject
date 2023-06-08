import { ActCategory, Activity } from '../db/index.js';

const validateValue = values => {
  // 값을 프론트로부터 제대로 받았는지 체크하는 기능. 라우터에서 객체를 받아온다.
  Object.values(values).map((item, index) => {
    if (!item) {
      throw new Error(`CHECK ${Object.keys(values)[index]}`);
    }
  });
  return;
};

const checkPermission = Model => async (_id, userId) => {
  /*
        DB 접근 권한 체크하는 기능. 서비스에서 매개변수 _id, userId 를 받아온다.
        에러메시지 객체를 반환하므로 서비스에서 아래와 같이 사용
        const errorMessage = await checkPermissionInEducation(_id,userId);
        if(errorMessage) return errorMessage;
    */
  const data = await Model.findByDataId({ _id });
  if (!data) {
    const errorMessage = 'Not found';
    return { errorMessage };
  }
  if (data.userId !== userId) {
    const errorMessage = 'Unauthorized';
    return { errorMessage };
  }
  return;
};

const checkPermissionInActCategory = checkPermission(ActCategory);
const checkPermissionInActivity = checkPermission(Activity);

export { validateValue, checkPermissionInActCategory, checkPermissionInActivity };
