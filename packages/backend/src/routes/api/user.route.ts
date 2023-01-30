import { Router } from 'express';
import { validator } from '../../middlewares/validator.middleware';
import { tryCatchWrapper } from '../../middlewares/try-catch.middleware';
import { userSchemaJoi } from '../../models/User';
import { userController } from '../../controllers';
import { auth } from '../../middlewares/auth.middleware';

const userRouter: Router = Router();

userRouter.post(
  '/register',
  validator(userSchemaJoi),
  tryCatchWrapper(userController.createUser.bind(userController))
);

userRouter.post(
  '/login',
  validator(userSchemaJoi),
  tryCatchWrapper(userController.loginUser.bind(userController))
);

userRouter.put('/profile', auth, tryCatchWrapper(userController.profileUser.bind(userController)));

userRouter.put('/password', auth, tryCatchWrapper(userController.profileUser.bind(userController)));

userRouter.get(
  '/logout/:id',
  auth,
  tryCatchWrapper(userController.logoutUser.bind(userController))
);

export default userRouter;
