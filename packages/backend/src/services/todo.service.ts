import { ParsedQs } from 'qs';
import Todo from '../models/Todo';
import { ITodo, IUpdateTodo } from '../types/todo.type';
import { APP_KEYS } from '../consts';

export default class TodoService {
  async findAll(
    owner: string,
    query: ParsedQs
  ): Promise<{
    todos: ITodo[];
    count: number;
  }> {
    const { search, status, page } = query;

    type Where = { [key: string]: boolean };
    const where: Where = {};
    where[`${status}`] = true;

    const todos: ITodo[] = !status
      ? await Todo.find({
          $and: [
            { $or: [{ isPrivate: false }, { owner, isPrivate: true }] },
            { title: { $regex: `${search}` } }
          ]
        })
          .skip((Number(page) - 1) * APP_KEYS.QUERY_KEYS.LIMIT)
          .limit(APP_KEYS.QUERY_KEYS.LIMIT)
      : await Todo.find({
          $and: [
            { $or: [{ isPrivate: false }, { owner, isPrivate: true }] },
            { title: { $regex: `${search}` } },
            where
          ]
        })
          .skip((Number(page) - 1) * APP_KEYS.QUERY_KEYS.LIMIT)
          .limit(APP_KEYS.QUERY_KEYS.LIMIT);

    const count = !status
      ? await Todo.find({
          $and: [
            { $or: [{ isPrivate: false }, { owner, isPrivate: true }] },
            { title: { $regex: `${search}` } }
          ]
        }).countDocuments()
      : await Todo.find({
          $and: [
            { $or: [{ isPrivate: false }, { owner, isPrivate: true }] },
            { title: { $regex: `${search}` } },
            where
          ]
        }).countDocuments();
    // const countPages = Math.ceil(count / APP_KEYS.QUERY_KEYS.LIMIT);

    return { todos, count };
  }

  async getTodoById(id: string) {
    const todo = await Todo.findById(id);
    return todo;
  }

  async addTodo(body: ITodo) {
    const { _id: owner, title, description, isPrivate, isComplete, isPublic } = body;
    const todo = await Todo.create({ title, description, isPrivate, isComplete, isPublic, owner });
    return todo;
  }

  async updateTodo(id: string, body: IUpdateTodo) {
    const { name, value } = body;
    const todo = await Todo.findByIdAndUpdate(id, { [name]: value }, { new: true });
    return todo;
  }

  async deleteTodo(id: string) {
    const todo = await Todo.findByIdAndRemove(id);
    return todo;
  }
}
