import { Router } from 'express';
import { todoController } from '../../controllers';
import { schemas } from '../../models/Todo';
import { auth, tryCatchWrapper, isExist, validator } from '../../middlewares';

const todosRouter: Router = Router();

todosRouter.get('/', auth, tryCatchWrapper(todoController.getAllTodo.bind(todoController)));

todosRouter.get(
  '/:id',
  auth,
  isExist,
  tryCatchWrapper(todoController.getTodoById.bind(todoController))
);

todosRouter.post(
  '/',
  auth,
  validator(schemas.addTodo),
  tryCatchWrapper(todoController.addTodo.bind(todoController))
);

todosRouter.put(
  '/:id',
  auth,
  isExist,
  validator(schemas.updateTodo),
  tryCatchWrapper(todoController.updateTodo.bind(todoController))
);

todosRouter.delete(
  '/:id',
  auth,
  isExist,
  tryCatchWrapper(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
