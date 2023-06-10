import { Router } from 'express';
import { activityService } from '../services/activityService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const activityRouter = Router();
const imgupload = upload.single('proofImg');

activityRouter.post('/activities', loginRequired, imgupload, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { groupId, state, name, usedDate, category, proofImg } = req.body;

    const newActivity = await activityService.addActivity({
      userId,
      groupId,
      state,
      name,
      usedDate,
      category,
      proofImg,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
});
//활동 관련기능
export { activityRouter };
