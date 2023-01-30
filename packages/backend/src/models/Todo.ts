import { model, Schema } from 'mongoose';
import Joi from 'joi';

// 1. Import an interface representing a document in MongoDB.
import { ITodo } from '../types/todo.type';

// 2. Create schemas corresponding to the document interface.
const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    isPrivate: {
      type: Boolean,
      required: true
    },
    isComplete: {
      type: Boolean
    },
    isPublic: {
      type: Boolean
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

const addTodo = Joi.object<ITodo>({
  _id: Joi.string(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  isPrivate: Joi.bool().required(),
  isComplete: Joi.bool().required(),
  isPublic: Joi.bool().required()
});

const updateTodo = Joi.object({
  name: Joi.string().required(),
  value: Joi.bool().required()
});

// 3. Create a Model.
const Todo = model('Todo', todoSchema);

export const schemas = { addTodo, updateTodo };

export default Todo;
