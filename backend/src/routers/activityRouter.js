import { Router } from 'express';
import { activityService } from '../services/activityService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { validateValue } from '../utils/validate.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const activityRouter = Router();

//Read
activityRouter.get(
  '/getdata',
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const allActivitys = await activityService.getAllActivity({
      userId,
    });
    if (allActivitys.errorMessege) {
      throw new Error(allActivitys.errorMessage);
    }

    res.status(200).json('data');
  }),
);

//Create
activityRouter.post(
  '/postdata',
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const { name, groupId, userDate, state, actCategoryId } = req.body;

    const activity = {
      userId,
      groupId,
      name,
      userDate,
      state,
      actCategoryId,
    };

    validateValue(activity);

    const addNewActivity = await activityService.addActivity({
      activity,
    });

    res.status(201).json('data');
  }),
);

//Update
activityRouter.put('/putdata', async (req, res) => {
  res.status(200).json('data');
});

//Delete
activityRouter.delete(
  '/deletedata/:_id',
  loginRequired,
  asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const _Id = req.params._id;

    const deleteActivity = await activityService.removeActivity({
      _id,
      userId,
    });

    if (deleteActivity.errorMessage) {
      throw new Error(deleteActivity.errorMessage);
    }

    res.status(200).json('data');
  }),
);

//활동 관련기능
export { activityRouter };
