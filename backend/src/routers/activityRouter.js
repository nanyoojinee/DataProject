import { Router } from 'express';
import { activityService } from '../services/activityService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const activityRouter = Router();
const imgupload = upload.single('image');

/** 내 활동 추가 */
activityRouter.post('/activities', imgupload, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { name, groupId, usedDate, state, actCategoryId } = req.body;

    const newActivity = await activityService.addActivity({
      userId,
      groupId,
      name,
      usedDate,
      state,
      actCategoryId,
    });

    if (newActivity && newActivity.errorMessage) {
      throw new Error(newActivity.errorMessage);
    }
    res.status(201).json({ newActivity });
    return;
  } catch (error) {
    next(error);
  }
});

/** 내 활동 목록 조회 */
activityRouter.get('/myActivities/:userId', loginRequired, async (req, res) => {
  try {
    const userId = req.currentUserId;
    const { groupId, state, name, usedDate, actCategoryId, proofImg } = req.body;

    const allActivities = await activityService.getAllActivity({
      userId,
      groupId,
      state,
      name,
      usedDate,
      actCategoryId,
      proofImg,
    });

    if (allActivities && allActivities.errorMessage) {
      throw new Error(allActivities.errorMessage);
    }
    res.status(200).json({ allActivities });
    return;
  } catch (error) {
    next(error);
  }
});

/** 내 활동 삭제 */
activityRouter.delete('/deletedata/:userId', loginRequired, async (req, res) => {
  try {
    const userId = req.currentUserId;

    const deleteActivity = await activityService.removeActivity({
      userId,
    });

    if (deleteActivity && deleteActivity.errorMessage) {
      throw new Error(deleteActivity.errorMessage);
    }
    res.status(200).json('deleteActivity');
    return;
  } catch (error) {
    next(error);
  }
});

//활동 관련기능
export { activityRouter };
